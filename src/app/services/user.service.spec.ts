import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { Database } from '@angular/fire/database'; // Firebase Database importieren

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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

    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
