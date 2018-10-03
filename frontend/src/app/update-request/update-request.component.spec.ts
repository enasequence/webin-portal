import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UiModule } from '../ui/ui.module';
import { WebinRestService } from '../webin-rest.service';
import { MockWebinRestService } from '../mock/mock-webin-rest.service';
import { UpdateRequestComponent } from './update-request.component';

describe('UpdateRequestComponent', () => {
  let component: UpdateRequestComponent;
  let fixture: ComponentFixture<UpdateRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateRequestComponent ],
      imports: [ UiModule ],
      providers: [
        {
          provide: WebinRestService,
          useClass: MockWebinRestService
        },
      ]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
