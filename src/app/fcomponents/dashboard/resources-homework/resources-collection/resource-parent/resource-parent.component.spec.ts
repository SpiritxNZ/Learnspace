import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceParentComponent } from './resource-parent.component';

describe('ResourceParentComponent', () => {
  let component: ResourceParentComponent;
  let fixture: ComponentFixture<ResourceParentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourceParentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
