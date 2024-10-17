import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogEditContactComponent } from './dialog-edit-contact.component';
import { SharedMaterialModule } from '../shared-material.module';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'; // Dialog-Abhängigkeiten importieren
import { UserService } from '../services/user.service'; // UserService importieren
import { Database } from '@angular/fire/database'; // Firebase Database
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('DialogEditContactComponent', () => {
  let component: DialogEditContactComponent;
  let fixture: ComponentFixture<DialogEditContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogEditContactComponent, SharedMaterialModule, BrowserAnimationsModule],
      providers: [
        { 
          provide: MatDialogRef, 
          useValue: { close: jasmine.createSpy('close') } // Mock MatDialogRef
        },
        { 
          provide: MAT_DIALOG_DATA, 
          useValue: { user: { id: '1', email: 'john.doe@example.com', phone: '123456789' } } // Mock-Daten mit 'email'
        },
        {
          provide: Database, 
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
          provide: UserService, 
          useValue: {
            updateUserFields: jasmine.createSpy('updateUserFields').and.returnValue(Promise.resolve()) 
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DialogEditContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
