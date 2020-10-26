import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { StorePage } from './store';

describe('StorePage', () => {
  let component: StorePage;
  let fixture: ComponentFixture<StorePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StorePage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(StorePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
