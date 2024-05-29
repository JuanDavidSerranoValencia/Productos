import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateProductoPage } from './update-producto.page';

describe('UpdateProductoPage', () => {
  let component: UpdateProductoPage;
  let fixture: ComponentFixture<UpdateProductoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateProductoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
