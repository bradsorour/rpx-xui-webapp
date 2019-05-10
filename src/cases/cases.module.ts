import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppConfig } from './case.config';
import { ScrollToService } from '@nicky-lenaers/ngx-scroll-to';
import { HttpClientModule } from '@angular/common/http';
import { CasesCreateComponent } from './containers/cases-create/cases-create.component';

import {
  CaseUIToolkitModule, DraftService, AlertService, HttpService, AuthService as CCDAuthService, CasesService,
  HttpErrorService, AbstractAppConfig, CaseEditWizardGuard, RouterHelperService,
  DocumentManagementService, PageValidationService, PlaceholderService
} from '@hmcts/ccd-case-ui-toolkit';

import { casesRouting } from './case-feature.routes';
import {StoreModule} from '@ngrx/store';
import {reducer} from './store';
import {SharedModule} from '../app/shared/shared.module';
import {HttpModule} from '@angular/http';
import {MatDialogModule} from '@angular/material';
import {CdkTableModule} from '@angular/cdk/table';


@NgModule({
  imports: [
    CommonModule,
    CaseUIToolkitModule,
    MatDialogModule,  // TODO check with ccd why do we need material
    CdkTableModule,
    HttpClientModule,
    StoreModule.forFeature('cases', reducer),
    casesRouting,
    SharedModule,
    HttpModule
  ],
  declarations: [CasesCreateComponent],
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
    AppConfig,
    {
      provide: AbstractAppConfig,
      useExisting: AppConfig
    },
    ScrollToService
  ]
})
/**
 * Entry point for Cases Module that is also lazy loaded.
 */
export class CasesModule { }
