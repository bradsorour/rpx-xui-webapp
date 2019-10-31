import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { AbstractAppConfig, AlertService, AuthService as CCDAuthService, CaseEditWizardGuard, CasesService, CaseUIToolkitModule, CreateCaseFiltersModule, DocumentManagementService, DraftService, HttpErrorService, HttpService, PageValidationService, PlaceholderService, RequestOptionsBuilder, RouterHelperService, SearchFiltersModule, SearchService } from '@hmcts/ccd-case-ui-toolkit';
import { combineReducers, StoreModule } from '@ngrx/store';
import { ScrollToService } from '@nicky-lenaers/ngx-scroll-to';
import { AppConfig } from '../../../app/services/ccd-config/ccd-case.config';
import { AppConfigService } from '../../../app/services/config/configuration.services';
import { SharedModule } from '../../../app/shared/shared.module';
import * as fromCases from '../../store/reducers/';
import { CaseFilterComponent } from './case-filter.component';

class MockSortService {
  public features = {};
  public getFeatureToggle() { }
  public getEditorConfiguration() { }
}
describe('Case Filter Component', () => {
  let component: CaseFilterComponent;
  let fixture: ComponentFixture<CaseFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        CaseUIToolkitModule,
        HttpClientTestingModule,
        StoreModule.forRoot({ ...fromCases.reducers, cases: combineReducers(fromCases.reducers) }),
        // tslint:disable-next-line: deprecation
        HttpModule,
        SharedModule,
        SearchFiltersModule,
        CreateCaseFiltersModule,
      ],
      declarations: [CaseFilterComponent],
      providers: [
        PlaceholderService,
        CasesService,
        CCDAuthService,
        HttpService,
        HttpErrorService,
        AlertService,
        DraftService,
        PageValidationService,
        CaseEditWizardGuard,
        RouterHelperService,
        DocumentManagementService,
        AppConfigService,
        RequestOptionsBuilder,
        AppConfigService,
        AppConfig,
        {
          provide: SearchService,
          useValue: {
            requestOptionsBuilder: RequestOptionsBuilder
          }
        },
        {
          provide: AbstractAppConfig,
          useExisting: AppConfig
        },
        {
          provide: AppConfigService,
          useClass: MockSortService
        },
        ScrollToService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseFilterComponent);
    component = fixture.componentInstance;
    component.startButtonText = 'start';
    component.caseCreatFilterBindings = [];
    component.fromCasesFeature = fromCases;
    fixture.detectChanges();
  });

  xit('should create', () => {
    //  expect(component).toBeTruthy();
  });



});
