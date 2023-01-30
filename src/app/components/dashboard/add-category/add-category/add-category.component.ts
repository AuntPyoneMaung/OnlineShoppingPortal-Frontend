import { Component, OnInit, Input } from '@angular/core';
import { ModalContext } from 'src/app/modal/modal-context';
import { ModalContainerComponent } from 'src/app/modal/modal-container/modal-container.component';
import { HttpProviderService } from 'src/app/service/http-provider.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss'],
})
export class AddCategoryComponent implements OnInit {
  constructor(private service: HttpProviderService) {}

  CategoryName = '';
  SegmentId = '';

  ngOnInit() {}

  addtheCategory() {
    const cat = {
      CategoryName: this.CategoryName,
      SegmentId: this.SegmentId,
    };

    this.service.addCategory(cat).subscribe((res) => {
      console.log(res);
      alert(res.body.categoryName + ' is added!');
      window.location.reload();
    });
  }
}
