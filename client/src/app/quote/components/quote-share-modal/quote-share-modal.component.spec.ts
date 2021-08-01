import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSmartModalService } from 'ngx-smart-modal';

import { QuotePreviewComponent, QuoteShareModalComponent } from '../../components';
import { ContactData } from '../../models';
import { NgxSmartModalServiceMock } from '../../stub';
import { Component } from '@angular/core';

@Component({
  selector: 'app-share-form',
  template: '<form></form>',
})
export class ShareFormComponent {}

describe('ShareModalComponent', () => {
  let component: QuoteShareModalComponent;
  let fixture: ComponentFixture<QuoteShareModalComponent>;

  const testQuote = { text: 'test quote text', author: 'test' };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [
        QuoteShareModalComponent,
        QuotePreviewComponent,
        ShareFormComponent,
      ],
      providers: [
        { provide: NgxSmartModalService, useClass: NgxSmartModalServiceMock },
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteShareModalComponent);
    component = fixture.componentInstance;
    // component.
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onShareSubmit', () => {
    it('should set data and close modal on share submit', () => {
      const contractData = {
        email: 'test@test.com',
      } as ContactData;
      const spySetData = spyOn((component as any).modal, 'setData');
      const spyClose = spyOn((component as any).modal, 'close');

      component.quote = { ...testQuote };
      component.onShareSubmit(contractData);

      expect(spySetData).toHaveBeenCalledWith({
        quote: { ...testQuote },
        ...contractData,
      }, true);
      expect(spyClose).toHaveBeenCalled();
    });
  });

  describe('onShareCancel', () => {
    it('should set data to null on modal close', () => {
      const spySetData = spyOn((component as any).modal, 'setData');
      const spyClose = spyOn((component as any).modal, 'close');

      component.onShareCancel();

      expect(spySetData).toHaveBeenCalledWith(null, true);
      expect(spyClose).toHaveBeenCalled();
    });
  });
});
