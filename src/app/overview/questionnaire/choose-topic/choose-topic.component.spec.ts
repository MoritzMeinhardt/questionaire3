import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseTopicComponent } from './choose-topic.component';

describe('ChooseTopicComponent', () => {
  let component: ChooseTopicComponent;
  let fixture: ComponentFixture<ChooseTopicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseTopicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseTopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
