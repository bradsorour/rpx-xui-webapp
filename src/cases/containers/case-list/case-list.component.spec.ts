import {State} from './../../../app/store/reducers/index';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CaseListComponent} from './case-list.component';
import {AppConfig} from '../../../app/services/ccd-config/ccd-case.config';
import {DefinitionsService} from '@hmcts/ccd-case-ui-toolkit/dist/shared/services/definitions/definitions.service';
import {Store} from '@ngrx/store';
import {AppConfigService} from '../../../app/services/config/configuration.services';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {CaseFilterToggle, FindCaselistPaginationMetadata} from '../../store/actions/case-list.action';
import {provideMockStore, MockStore} from '@ngrx/store/testing';
import {Jurisdiction, PaginationMetadata} from '@hmcts/ccd-case-ui-toolkit';
import {Observable, of} from 'rxjs';

describe('CaseListComponent', () => {
  let component: CaseListComponent;
  let fixture: ComponentFixture<CaseListComponent>;
  let store: MockStore<State>;

  /**
   * Spies
   */
  const mockService = jasmine.createSpy();
  const mockAppConfig = jasmine.createSpy();

  let spyOnDispatchToStore = jasmine.createSpy();
  let spyOnStorePipe = jasmine.createSpy();

  // let spyOnPaginationMetadataObservable = jasmine.createSpy();

  class MockAppConfig {
    getPaginationPageSize() {
      return 42;
    }
  }

  class MockDefinitionsService {
    getJurisdictions() {
      return of('jursdictions')
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CaseListComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: AppConfigService,
          useClass: mockService
        },
        {
          provide: AppConfig,
          useClass: MockAppConfig
        },
        {
          provide: DefinitionsService,
          useClass: MockDefinitionsService
        },
        provideMockStore(),
      ]
    });
    store = TestBed.get(Store);
    spyOnDispatchToStore = spyOn(store, 'dispatch').and.callThrough();
    spyOnStorePipe = spyOn(store, 'pipe').and.callThrough();

    // spyOnPaginationMetadataObservable = spyOn(component, 'paginationMetadata$').and.callThrough();

    fixture = TestBed.createComponent(CaseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  xdescribe('getToggleButtonName()', () => {

    it('should return the toggle button name as \'Hide Filter\' if we have shown ' +
      'the filter', () => {
      expect(component.getToggleButtonName(true)).toEqual('Hide Filter');
    });

    it('should return the toggle button name as \'Show Filter\' if we do not show ' +
      'the filter', () => {
      expect(component.getToggleButtonName(false)).toEqual('Show Filter');
    });
  });

  describe('findCaseListPaginationMetadata()', () => {

    /**
     * TODO: event should show the shape of event object.
     */
    it('should dispatch an action to find the case list pagination metadata.', () => {
      const event = {
        test: 'test',
      };
      component.findCaseListPaginationMetadata(event);
      expect(spyOnDispatchToStore).toHaveBeenCalledWith(new FindCaselistPaginationMetadata(event));
    });
  });

  describe('toggleFilter()', () => {

    /**
     * TODO: We should always give the payload a proper name, not just payload.
     */
    it('should dispatch an action on toggle of the filter to show and hide the filter.', () => {
      component.toggleFilter();
      expect(spyOnDispatchToStore).toHaveBeenCalledWith(new CaseFilterToggle(false));
    });
  });

  describe('createEvent()', () => {

    /**
     * We should think about calling the createEvent function
     * makePaginationMetadataQuery as it's only used to find the Case List Pagination
     * Metadata.
     */
    it('should be able to create an event.', () => {

      const jurisdiction = {id: 'PROBATE'};
      const caseType = {id: 'GrantOfRepresentation'};
      const caseState = {id: 'CaseCreated'};
      const metadataFields = ['[CASE_REFERENCE]'];
      const formGroupValues = {};
      const page = 1;

      const event = component.createEvent(jurisdiction, caseType, caseState, metadataFields,
        formGroupValues, page);

      expect(event.selected.jurisdiction).toEqual(jurisdiction);
      expect(event.selected.caseType).toEqual(caseType);
      expect(event.selected.caseState).toEqual(caseState);
      expect(event.selected.metadataFields).toEqual(metadataFields);
      expect(event.selected.formGroup.value).toEqual(formGroupValues);
      expect(event.selected.page).toEqual(page);
    });
  });

  describe('applyChangePage()', () => {

    /**
     * We initially check that page is undefined, so that we know that calling the
     * findCaseListPaginationMetadata() function is definitely changing the components page property.
     */
    it('should update the components page property on page change.', () => {

      // expect(component.page).toBeUndefined();

      const event = {
        selected: {
          page: 1,
        }
      };

      component.applyChangePage(event);

      expect(component.page).toEqual(event.selected.page);
    });

    /**
     * Note that the findCaseListPaginationMetadata() dispatches an Action to get the
     * pagination metadata.
     */
    it('should call findCaseListPaginationMetadata() on page change.', () => {

      const spyOnFindCaseListPaginationMetadata = spyOn(component, 'findCaseListPaginationMetadata').and.callThrough();

      const event = {
        selected: {
          page: 1,
        }
      };

      component.applyChangePage(event);

      expect(spyOnFindCaseListPaginationMetadata).toHaveBeenCalled();
    });
  });

  describe('applyFilter()', () => {

    let event;

    beforeEach(() => {

      const jurisdiction = {id: 'PROBATE'};
      const caseType = {id: 'GrantOfRepresentation'};
      const caseState = {id: 'CaseCreated'};
      const metadataFields = ['[CASE_REFERENCE]'];
      const formGroupValues = {};
      const page = 1;

      event = component.createEvent(jurisdiction, caseType, caseState, metadataFields,
        formGroupValues, page);
    });

    it('should call findCaseListPaginationMetadata() on apply of filter.', () => {

      const spyOnFindCaseListPaginationMetadata = spyOn(component, 'findCaseListPaginationMetadata').and.callThrough();

      component.applyFilter(event);

      expect(spyOnFindCaseListPaginationMetadata).toHaveBeenCalled();
    });

    it('should update the components page property on apply of a filter change.', () => {

      // expect(component.page).toBeUndefined();

      component.applyFilter(event);

      expect(component.page).toEqual(event.selected.page);
    });
  });

  describe('onPaginationSubscribeHandler()', () => {

    it('should update the components paginationMetadata property, on return of subscription.', () => {

      const paginationMetadata = new PaginationMetadata();
      paginationMetadata.total_pages_count = 33;
      paginationMetadata.total_results_count = 811;

      component.onPaginationSubscribeHandler(paginationMetadata);

      expect(component.paginationMetadata.total_pages_count).toEqual(paginationMetadata.total_pages_count);
      expect(component.paginationMetadata.total_results_count).toEqual(paginationMetadata.total_results_count);
    });
  });

  describe('onToogleHandler()', () => {

    it('should update the components showFilter property, on return of toogle subscription.', () => {

      const showFilter = true;
      component.onToogleHandler(showFilter);

      expect(component.showFilter).toEqual(showFilter);
    });
  });

  describe('onFilterSubscriptionHandler()', () => {

    it('should update the components jurisdiction property, on return of the filter subscription.', () => {

      const filterResult = [
        {id: 'PROBATE'},
        {id: 'GrantOfRepresentation'},
        {id: 'SolAppUpdated'},
        ['[CASE_REFERENCE]']
      ];

      component.onFilterSubscriptionHandler(filterResult);

      expect(component.jurisdiction.id).toEqual('PROBATE');
      expect(component.caseType.id).toEqual('GrantOfRepresentation');
      expect(component.caseState.id).toEqual('SolAppUpdated');
      expect(component.metadataFields[0]).toEqual('[CASE_REFERENCE]');
    });
  });

  describe('onResultsViewHandler()', () => {

    it('should set the components resultsArr property on return of subscription.', () => {

      const resultView = {
        columns: [],
        results: [
          {
            case_id: 'DRAFT274146',
          }
        ],
        result_error: null
      };

      component.onResultsViewHandler(resultView);

      expect(component.resultsArr).toEqual([{ case_id: 'DRAFT274146' }]);
    });
  });

  // describe('ngOnDestroy()', () => {
  //
  //   it('should unsubscribe.', () => {
  //
  //     const spyOnFilterSubscription = spyOn(component, 'filterSubscription').and.callThrough();
  //
  //     component.ngOnDestroy();
  //
  //     expect(spyOnFilterSubscription, 'unsubscribe').toHaveBeenCalled();
  //   });
  // });

  // describe('ngOnInit()', () => {
  //
  //   it('should set the initial page number to 1', () => {
  //
  //     expect(component.page).toBeUndefined();
  //
  //     component.ngOnInit();
  //
  //     expect(component.page).toEqual(1);
  //   });
  // });

  describe('listenToPaginationMetadata()', () => {

    xit('should call pipe on store.', () => {

      /**
       * Thus works if there the following piece of code is commented:
       * <code>
       *     this.paginationSubscription = this.paginationMetadata$.subscribe(paginationMetadata =>
       *     this.onPaginationSubscribeHandler(paginationMetadata));
       * </code>
       */
      component.listenToPaginationMetadata();
      expect(spyOnStorePipe).toHaveBeenCalled();
    });

    it('should scroll to the fragment section', async () => {
      const spyOnPaginationHandler = spyOn(component, 'onPaginationSubscribeHandler').and.callThrough();
      component.listenToPaginationMetadata();
      // await fixture.whenStable();
      expect(spyOnPaginationHandler).toHaveBeenCalled();
    });
    // it('should call pipe on store.', () => {
    //
    //   const spyOnFindCaseListPaginationMetadata = spyOn(component, 'paginationMetadata$').and.callThrough();
    //
    //   component.listenToPaginationMetadata();
    //   expect(spyOnFindCaseListPaginationMetadata).toHaveBeenCalled();
      // expect(component.paginationMetadata$).toBeUndefined();
      //
      // component.listenToPaginationMetadata();
      //
      // const paginationMetadata = new PaginationMetadata();
      // paginationMetadata.total_results_count = 42;
      // paginationMetadata.total_pages_count = 2;
      //
      // expect(component.paginationMetadata$).toEqual(of(paginationMetadata));
    // });
  });
});

