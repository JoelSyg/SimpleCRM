import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogAddUserComponent } from './dialog-add-user.component';
import { SharedMaterialModule } from '../shared-material.module';
import { MatDialogRef } from '@angular/material/dialog'; 
import { UserService } from '../services/user.service'; // UserService importieren
import { Database } from '@angular/fire/database'; // Firebase Database
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('DialogAddUserComponent', () => {
  let component: DialogAddUserComponent;
  let fixture: ComponentFixture<DialogAddUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogAddUserComponent, SharedMaterialModule, BrowserAnimationsModule],
      providers: [
        { 
          provide: MatDialogRef, 
          useValue: { close: jasmine.createSpy('close') } 
        },
        {
          provide: Database, // Mock Database
          useValue: {
            ref: jasmine.createSpy('ref').and.returnValue({
              set: jasmine.createSpy('set').and.returnValue(Promise.resolve()),
              get: jasmine.createSpy('get').and.returnValue(Promise.resolve({ exists: () => false })),
              push: jasmine.createSpy('push').and.returnValue({ key: 'mockKey' }),
              update: jasmine.createSpy('update').and.returnValue(Promise.resolve()),
            })
          }
        },
        {
          provide: UserService, // Optional: Mock für den UserService
          useValue: {
            addUser: jasmine.createSpy('addUser').and.returnValue(Promise.resolve()) // Beispiel-Mock für addUser
          }
        }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogAddUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
