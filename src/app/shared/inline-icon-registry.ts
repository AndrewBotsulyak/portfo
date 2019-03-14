import {Injectable} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {Observable, of} from 'rxjs';
import {MatIconRegistry} from '@angular/material';
import {HttpClient} from '@angular/common/http';


class MbSvgIconConfig {
  svgElement: SVGElement | null = null;
  constructor(public source: string) { }
}

@Injectable()
export class InlineIconRegistry extends MatIconRegistry {

  private _mbIconIdToSource: Map<string, SVGElement> = new Map();
  private _mdIconSetConfigs = new Map<string, MbSvgIconConfig[]>();

  constructor(http: HttpClient, sanitizer: DomSanitizer) {
    super(http, sanitizer, null);
  }

  mbAddSvgIconSet(source: string): this {
    return this.mbAddSvgIconSetInNamespace('', source);
  }

  /**
   * Registers an icon set by URL in the specified namespace.
   * @param namespace Namespace in which to register the icon set.
   * @param source
   */
  mbAddSvgIconSetInNamespace(namespace: string, source: string): this {
    const config = new MbSvgIconConfig(source);
    const configNamespace = this._mdIconSetConfigs.get(namespace);

    if (configNamespace) {
      configNamespace.push(config);
    } else {
      this._mdIconSetConfigs.set(namespace, [config]);
    }
    return this;
  }

  mbAddSvgIconSource(iconName: string, source: string): this {
    const svgElement = this._mbCreateSvgElementForSingleIcon(source);
    this._mbIconIdToSource.set(`:${iconName}`, svgElement);
    return this;
  }

  mbAddSvgIconSourceInNamespace(namespace: string, iconName: string, source: string): this {
    const svgElement = this._mbCreateSvgElementForSingleIcon(source);
    this._mbIconIdToSource.set(`${namespace}:${iconName}`, svgElement);
    return this;
  }

  getNamedSvgIcon(name: string, namespace: string = ''): Observable<SVGElement> {
    const iconId = `${namespace}:${name}`;

    if (this._mbIconIdToSource.has(iconId)) {
      return of(this._mbIconIdToSource.get(iconId) ? <SVGElement>this._mbIconIdToSource.get(iconId).cloneNode(true) : null);
    }

    // See if we have any icon sets registered for the namespace.
    const iconSetConfigs = this._mdIconSetConfigs.get(namespace);
    if (iconSetConfigs) {
      return this._mbGetSvgFromIconSetConfigs(name, iconSetConfigs);
    }

    return super.getNamedSvgIcon(name, namespace);
  }

  /**
   * Duplicated from MdIconRegistry to avoid hackily invoking a private method.
   */
  private _mbCreateSvgElementForSingleIcon(source: string): SVGElement {
    const svg = this._mbSvgElementFromString(source);
    this._mbSetSvgAttributes(svg);
    return svg;
  }

  /**
   * Duplicated from MdIconRegistry to avoid hackily invoking a private method.
   */
  private _mbSvgElementFromString(str: string): SVGElement {
    const div = document.createElement('DIV');
    div.innerHTML = str;
    const svg = div.querySelector('svg') as SVGElement;
    if (!svg) {
      throw new Error(`cannot create`);
    }
    return svg;
  }

  /**
   * Duplicated from MdIconRegistry to avoid hackily invoking a private method.
   */
  private _mbSetSvgAttributes(svg: SVGElement): SVGElement {
    if (!svg.getAttribute('xmlns')) {
      svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    }
    svg.setAttribute('fit', '');
    svg.setAttribute('height', '100%');
    svg.setAttribute('width', '100%');
    svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    svg.setAttribute('focusable', 'false');
    return svg;
  }

  /**
   * Attempts to find an icon with the specified name in any of the SVG icon sets.
   * First searches the available cached icons for a nested element with a matching name, and
   * if found copies the element to a new <svg> element. If not found, fetches all icon sets
   * that have not been cached, and searches again after all fetches are completed.
   * The returned Observable produces the SVG element if possible, and throws
   * an error if no icon with the specified name can be found.
   */
  private _mbGetSvgFromIconSetConfigs(name: string, iconSetConfigs: MbSvgIconConfig[]):
  Observable<SVGElement> {
    // For all the icon set SVG elements we've fetched, see if any contain an icon with the
    // requested name.
    const namedIcon = this._mbExtractIconWithNameFromAnySet(name, iconSetConfigs);

    if (namedIcon) {
      return of(namedIcon);
    }

    iconSetConfigs.filter(iconSetConfig => !iconSetConfig.svgElement)
        .map(iconSetConfig => {
          const svg = this._mbSvgElementFromString(iconSetConfig.source);
          if (svg) {
            iconSetConfig.svgElement = svg;
          }
        });

    const foundIcon = this._mbExtractIconWithNameFromAnySet(name, iconSetConfigs);

    if (!foundIcon) {
      throw Error(`Unable to find icon with the name "${name}"`);
    }

    return of(foundIcon);
  }

  /**
   * Searches the cached SVG elements for the given icon sets for a nested icon element whose "id"
   * tag matches the specified name. If found, copies the nested element to a new SVG element and
   * returns it. Returns null if no matching element is found.
   */
  private _mbExtractIconWithNameFromAnySet(iconName: string, iconSetConfigs: MbSvgIconConfig[]):
      SVGElement | null {
    // Iterate backwards, so icon sets added later have precedence.
    for (let i = iconSetConfigs.length - 1; i >= 0; i--) {
      const config = iconSetConfigs[i];
      if (config.svgElement) {
        const foundIcon = this._mbExtractSvgIconFromSet(config.svgElement, iconName);
        if (foundIcon) {
          return foundIcon;
        }
      }
    }
    return null;
  }

  /**
   * Searches the cached element of the given SvgIconConfig for a nested icon element whose "id"
   * tag matches the specified name. If found, copies the nested element to a new SVG element and
   * returns it. Returns null if no matching element is found.
   */
  private _mbExtractSvgIconFromSet(iconSet: SVGElement, iconName: string): SVGElement | null {
    const iconNode = iconSet.querySelector('#' + iconName);

    if (!iconNode) {
      return null;
    }

    // If the icon node is itself an <svg> node, clone and return it directly. If not, set it as
    // the content of a new <svg> node.
    if (iconNode.tagName.toLowerCase() === 'svg') {
      return this._mbSetSvgAttributes(iconNode.cloneNode(true) as SVGElement);
    }

    // If the node is a <symbol>, it won't be rendered so we have to convert it into <svg>. Note
    // that the same could be achieved by referring to it via <use href="#id">, however the <use>
    // tag is problematic on Firefox, because it needs to include the current page path.
    if (iconNode.nodeName.toLowerCase() === 'symbol') {
      return this._mbSetSvgAttributes(this._mbToSvgElement(iconNode));
    }

    // createElement('SVG') doesn't work as expected; the DOM ends up with
    // the correct nodes, but the SVG content doesn't render. Instead we
    // have to create an empty SVG node using innerHTML and append its content.
    // Elements created using DOMParser.parseFromString have the same problem.
    // http://stackoverflow.com/questions/23003278/svg-innerhtml-in-firefox-can-not-display
    const svg = this._mbSvgElementFromString('<svg></svg>');
    // Clone the node so we don't remove it from the parent icon set element.
    svg.appendChild(iconNode.cloneNode(true));

    return this._mbSetSvgAttributes(svg);
  }

  /**
   * Converts an element into an SVG node by cloning all of its children.
   */
  private _mbToSvgElement(element: Element): SVGElement {
    const svg = this._mbSvgElementFromString('<svg></svg>');

    for (let i = 0; i < element.childNodes.length; i++) {
      if (element.childNodes[i].nodeType === Node.ELEMENT_NODE) {
        svg.appendChild(element.childNodes[i].cloneNode(true));
      }
    }

    return svg;
  }
}
