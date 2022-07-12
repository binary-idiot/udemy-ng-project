import {Directive, ElementRef, HostBinding, HostListener} from "@angular/core";

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.open') isOpen = false;

  @HostListener('document:click', ['$event']) toggleOpen(eventData: Event) {
    this.isOpen = this.el.nativeElement.contains(event.target) ?
      !this.isOpen : false;
  }

  constructor(private el: ElementRef) {
  }
}
