import { TestBed, inject } from '@angular/core/testing';
import { ExUITitleService} from './exui-title.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, BehaviorSubject } from 'rxjs';

describe('ExUITitleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      providers: [
        ExUITitleService,
        {
          provide: Router,
          useValue: {
            events: new BehaviorSubject<Event>(null)
          }
        },
        {
          provide: ActivatedRoute,
          useValue:
          {
            firstChild: {
              snapshot: {
                data: { title: 'First Child 1'}
              },
              firstChild: {
                snapshot: {
                  data: { title: 'First Child 2'},
                }
              }
            }
          }
        }
      ]
    });
  });

  it('should be created', inject([ExUITitleService], (service: ExUITitleService) => {
    expect(service).toBeTruthy();
  }));

  it('ngOnInit should update the child title', inject([ExUITitleService], (service: ExUITitleService) => {
    const event = new NavigationEnd(42, '/', '/');
    TestBed.get(Router).events.next(event);
    service.ngOnInit();
    service.title$.subscribe(title => {
      expect(title).toBe('First Child 2');
    });
  }));

  it('should unsubscribe onDestroy', inject([ExUITitleService], (service: ExUITitleService) => {
    const event = new NavigationEnd(42, '/', '/');
    TestBed.get(Router).events.next(event);
    service.ngOnInit();
    spyOn(service.titleSubscription, 'unsubscribe').and.callThrough();
    service.ngOnDestroy();
    expect(service.titleSubscription.unsubscribe).toHaveBeenCalled();
  }));

});