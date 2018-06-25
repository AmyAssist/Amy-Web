import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
    MatButtonModule,
    MatToolbarModule,
    MatInputModule
} from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HomeComponent } from './home.component';
import {DatabaseService} from '../../Services/database.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
      const spy = jasmine.createSpyObj('DatabaseService', ['getValue']);
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [
          MatButtonModule,
            MatToolbarModule,
            MatInputModule,
            MatFormFieldModule,
            BrowserAnimationsModule
      ],
      providers: [
      { provide: DatabaseService, useValue: spy }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
