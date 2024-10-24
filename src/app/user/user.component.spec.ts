import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserComponent } from './user.component';
import { SharedMaterialModule } from '../shared-material.module';
import { UserService } from '../services/user.service'; // UserService importieren
import { Database } from '@angular/fire/database'; // Firebase Database importieren

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserComponent, SharedMaterialModule],
      providers: [
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
        UserService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});