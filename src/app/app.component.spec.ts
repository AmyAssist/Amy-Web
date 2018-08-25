import { TestBed, async } from '@angular/core/testing';
import { Component } from '@angular/core';
import {
    MatButtonModule,
    MatToolbarModule,
} from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from './material.module';


import { AppComponent } from './app.component';
import { BottomBarComponent } from './Components/bottom-bar/bottom-bar.component';
import { AmyChatComponent } from './Components/bottom-bar/Components/amy-chat/amy-chat.component';

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent,
                RouterOutletStubComponent,
                BottomBarComponent,
                AmyChatComponent
            ],
            imports: [
                MaterialModule,
                MatButtonModule,
                MatToolbarModule,
                RouterTestingModule
            ]
        }).compileComponents();
    }));
    it('should create the app', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));
    it(`should have as title 'app'`, async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app.title).toEqual('app');
    }));
    it('should render title in a h1 tag', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        //expect(compiled.querySelector('h1').textContent).toContain('Welcome to Amy-Webapp!');
    }));
});


@Component({ selector: 'router-outlet', template: '' })
class RouterOutletStubComponent { }
