import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeleteProductoPage } from './delete-producto.page';

describe('DeleteProductoPage', () => {
  let component: DeleteProductoPage;
  let fixture: ComponentFixture<DeleteProductoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteProductoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
