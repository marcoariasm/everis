import {
  Directive,
  ViewContainerRef,
  Input,
  OnDestroy,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import tippy from 'tippy.js';

@Directive({
  selector: '[ngCustomTooltip]',
})
export class CustomTooltipDirective implements OnDestroy, AfterViewInit {
  constructor(
    private element: ElementRef,
    private viewContainer: ViewContainerRef
  ) {}

  @Input()
  ngCustomTooltip: string;
  private _tippy: any;

  ngAfterViewInit(): void {
    const htmlContent = document.getElementById(this.ngCustomTooltip);

    this._tippy = tippy(this.element.nativeElement, {
      content: htmlContent,
      allowHTML: true,
    }) as any;
  }

  ngOnDestroy() {
    this.viewContainer.clear();
  }
}
