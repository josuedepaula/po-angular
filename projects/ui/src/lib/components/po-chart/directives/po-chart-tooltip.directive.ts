import { Directive, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';

import { PoChartTooltipBaseDirective } from './po-chart-tooltip-base.directive';
import { PoTooltipControlPositionService } from '../../../directives/po-tooltip/po-tooltip-control-position.service';

@Directive({
  selector: '[p-chart-tooltip]',
  providers: [PoTooltipControlPositionService]
})
export class PoChartTooltipDirective extends PoChartTooltipBaseDirective implements OnInit {
  tooltip;
  tooltipText;

  @HostListener('mouseenter') onMouseEnter() {
    if (!this.tooltip) {
      this.show();
    }
  }

  // @HostListener('mouseleave') onMouseLeave() {
  //   if (this.tooltip) { this.hide(); }
  // }

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    super();
  }

  ngOnInit() {}

  show() {
    this.create();
    this.renderer.addClass(this.tooltip, 'po-chart-tooltip-show');
  }

  hide() {
    this.renderer.removeClass(this.tooltip, 'po-chart-tooltip-show');
    window.setTimeout(() => {
      this.renderer.removeChild(document.body, this.tooltip);
      this.tooltip = null;
    });
  }

  create() {
    this.tooltipText = this.renderer.createElement('svg:text', 'svg');
    this.tooltipText.textContent = 'samir teste';
    this.renderer.addClass(this.tooltipText, 'po-chart-tooltip-text');
    this.renderer.setAttribute(this.tooltipText, 'x', this.tooltipElement['x']);
    this.renderer.setAttribute(this.tooltipText, 'y', this.tooltipElement['y']);

    const svgPointsGroup = this.renderer.parentNode(this.elementRef.nativeElement);
    this.renderer.appendChild(svgPointsGroup, this.tooltipText);

    this.createRect(svgPointsGroup);
  }

  createRect(svgPointsGroup) {
    const SVGRect = this.tooltipText.getBBox();

    this.tooltip = this.renderer.createElement('svg:rect', 'svg');
    this.renderer.addClass(this.tooltip, 'po-chart-tooltip');
    this.renderer.setAttribute(this.tooltip, 'width', SVGRect.width);
    this.renderer.setAttribute(this.tooltip, 'height', SVGRect.height);
    this.renderer.setAttribute(this.tooltip, 'x', this.tooltipElement['x']);
    this.renderer.setAttribute(this.tooltip, 'y', this.tooltipElement['y']);
    this.renderer.setAttribute(this.tooltip, 'fill', 'yellow');

    this.renderer.appendChild(svgPointsGroup, this.tooltip);

    this.renderer.insertBefore(svgPointsGroup, this.tooltip, this.tooltipText);

    // this.renderer.appendChild(svgPointsGroup, this.tooltipText);

    // this.renderer.appendChild(this.elementRef, this.elementRef.nativeElement);
  }
}
