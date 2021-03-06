import {ChangeDetectorRef, Component, Directive, Input, OnInit} from '@angular/core';
import {Trace} from "../../_models/trace";
import DateUtil from "../../_utils/date.utils";

@Directive({
  selector: `ktb-event-item-detail, [ktb-event-item-detail], [ktbEventItemDetail]`,
  exportAs: 'ktbEventItemDetail',
})
export class KtbEventItemDetail {}

@Component({
  selector: 'ktb-event-item',
  templateUrl: './ktb-event-item.component.html',
  styleUrls: ['./ktb-event-item.component.scss']
})
export class KtbEventItemComponent implements OnInit {

  public _event: Trace;

  @Input()
  get event(): Trace {
    return this._event;
  }
  set event(value: Trace) {
    if (this._event !== value) {
      this._event = value;
      this._changeDetectorRef.markForCheck();
    }
  }

  constructor(private _changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
  }

  getCalendarFormat() {
    return DateUtil.getCalendarFormats().sameElse;
  }

}
