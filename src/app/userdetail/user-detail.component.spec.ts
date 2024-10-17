import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserdetailComponent } from './user-detail.component';
import { SharedMaterialModule } from '../shared-material.module';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { UserService } from '../services/user.service';
import { Database } from '@angular/fire/database';

describe('UserdetailComponent', () => {
  let component: UserdetailComponent;
  let fixture: ComponentFixture<UserdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserdetailComponent, SharedMaterialModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({ get: (key: string) => '123' }),
            snapshot: {
              paramMap: {
                get: (key: string) => '123',
              },
            },
          },
        },
        {
          provide: UserService,
          useValue: { 
            getUserById: jasmine.createSpy('getUserById').and.returnValue(Promise.resolve({ id: '123', name: 'Test User' })),
          },
        },
        {
          provide: Database,
          useValue: {
            ref: jasmine.createSpy('ref').and.returnValue({
              set: jasmine.createSpy('set').and.returnValue(Promise.resolve()),
              get: jasmine.createSpy('get').and.returnValue(Promise.resolve({ exists: () => false })),
              push: jasmine.createSpy('push').and.returnValue({ key: 'mockKey' }),
              update: jasmine.createSpy('update').and.returnValue(Promise.resolve()),
            }),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
