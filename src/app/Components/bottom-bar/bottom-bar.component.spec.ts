import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DatabaseService } from "../../Services/database.service";

import { BottomBarComponent } from "./bottom-bar.component";
import { MatCardModule, MatFormFieldModule, MatIconModule, MatButtonModule, MatInputModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AmyChatComponent } from './Components/amy-chat/amy-chat.component';

describe('BottomBarComponent', () => {
  let component: BottomBarComponent;
  let fixture: ComponentFixture<BottomBarComponent>;

  beforeEach(async(() => {
    const spy = jasmine.createSpyObj('DatabaseService', ['getValue']);
    TestBed.configureTestingModule({
      declarations: [ BottomBarComponent, AmyChatComponent ],
      imports: [
        MatCardModule,
        MatIconModule,
        MatFormFieldModule,
        MatButtonModule,
        MatInputModule,
        FormsModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: DatabaseService, useValue: spy }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BottomBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
