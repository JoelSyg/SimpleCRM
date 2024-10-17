import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogEditUserComponent } from './dialog-edit-user.component';
import { SharedMaterialModule } from '../shared-material.module';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '../services/user.service'; 
import { Database } from '@angular/fire/database'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Importiere das Animationsmodul

describe('DialogEditUserComponent', () => {
  let component: DialogEditUserComponent;
  let fixture: ComponentFixture<DialogEditUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogEditUserComponent, SharedMaterialModule, BrowserAnimationsModule], // Füge BrowserAnimationsModule hinzu
      providers: [
        { 
          provide: MatDialogRef, 
          useValue: { close: jasmine.createSpy('close') } 
        },
        { 
          provide: MAT_DIALOG_DATA, 
          useValue: { user: { firstName: 'John', lastName: 'Doe', birthDate: new Date() } } 
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
            getUserById: jasmine.createSpy('getUserById').and.returnValue(Promise.resolve({ id: '123', name: 'Test User' })),
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DialogEditUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
