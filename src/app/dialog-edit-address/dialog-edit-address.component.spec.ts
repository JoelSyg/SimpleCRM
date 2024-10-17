import { TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogEditAddressComponent } from './dialog-edit-address.component'; // Korrigiere den Pfad zur Komponente
import { Database } from '@angular/fire/database'; // Firebase Database
import { UserService } from '../services/user.service'; // UserService importieren

describe('DialogEditAddressComponent', () => {
  let component: DialogEditAddressComponent;
  let fixture: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogEditAddressComponent], // Standalone-Komponente importieren
      providers: [
        { 
          provide: MatDialogRef, 
          useValue: { close: jasmine.createSpy('close') } // Mock MatDialogRef
        },
        { 
          provide: MAT_DIALOG_DATA, 
          useValue: { address: 'Test Address' } // Beispiel-Daten für den Dialog
        },
        {
          provide: Database,
          useValue: { // Mock der Database
            ref: jasmine.createSpy('ref').and.returnValue({
              set: jasmine.createSpy('set').and.returnValue(Promise.resolve()),
              get: jasmine.createSpy('get').and.returnValue(Promise.resolve({ exists: () => false })),
              push: jasmine.createSpy('push').and.returnValue({ key: 'mockKey' }),
              update: jasmine.createSpy('update').and.returnValue(Promise.resolve())
            })
          }
        },
        UserService // UserService bereitstellen
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DialogEditAddressComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
