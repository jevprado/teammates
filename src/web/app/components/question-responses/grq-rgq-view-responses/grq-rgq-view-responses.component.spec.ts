import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GrqRgqViewResponsesComponent } from './grq-rgq-view-responses.component';
import {
  ResponseModerationButtonModule,
} from '../../../pages-instructor/instructor-session-result-page/response-moderation-button/response-moderation-button.module';
import { PanelChevronModule } from '../../panel-chevron/panel-chevron.module';
import { TeammatesCommonModule } from '../../teammates-common/teammates-common.module';
import { GroupedResponsesModule } from '../grouped-responses/grouped-responses.module';

describe('GrqRgqViewResponsesComponent', () => {
  let component: GrqRgqViewResponsesComponent;
  let fixture: ComponentFixture<GrqRgqViewResponsesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [GrqRgqViewResponsesComponent],
      imports: [
        GroupedResponsesModule,
        ResponseModerationButtonModule,
        TeammatesCommonModule,
        HttpClientTestingModule,
        NgbModule,
        PanelChevronModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrqRgqViewResponsesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //ct1
  it('CT1: should display response when indicateMissingResponses is true and response is not missing', () => {
    component.indicateMissingResponses = true;
    component.responses = [
      {
        allResponses: [{ isMissingResponse: false, giver: 'User1', recipient: 'User2' }],
      },
    ] as any;
  
    component.ngOnInit(); 
    expect(Object.keys(component.responsesToShow).length).toBeGreaterThan(0);
  });

  //ct2
  it('CT2: should not display response when indicateMissingResponses is false and response is missing', () => {
    component.indicateMissingResponses = false;
    component.responses = [
      {
        allResponses: [{ isMissingResponse: true }],
      },
    ] as any;
  
    component.ngOnInit(); 
    expect(Object.keys(component.responsesToShow).length).toBe(0);
  });

  //ct3
  it('CT3: should not display response when sectionOfView does not match recipientSection', () => {
    component.sectionOfView = 'SectionA';
    component.responses = [
      {
        allResponses: [{ giverSection: 'SectionA', recipientSection: 'SectionB', giver: 'User1', recipient: 'User2' }],
      },
    ] as any;
  
    component.ngOnInit(); 
    expect(Object.keys(component.responsesToShow).length).toBe(0);
  });
  
  //ct4
  it('CT4: should not display response when isGrq is true and giverSection does not match sectionOfView', () => {
    component.isGrq = true;
    component.sectionOfView = 'SectionB';
    component.responses = [
      {
        allResponses: [{ giverSection: 'SectionA', recipientSection: 'SectionB', giver: 'User1', recipient: 'User2' }],
      },
    ] as any;
  
    component.ngOnInit(); 
    expect(Object.keys(component.responsesToShow).length).toBe(0);
  });
});
