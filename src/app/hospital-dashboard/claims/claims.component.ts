import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { InvoiceService } from '../../invoice.service';
@Component({
  selector: 'app-claims',
  standalone: true,
  imports: [CommonModule, DragDropModule ],
  templateUrl: './claims.component.html',
  styleUrl: './claims.component.css'
})
export class ClaimsComponent {
  selectedFile: File | null = null;
  fileURL: SafeResourceUrl | null = null;
 feedbackMessage: string | null = null;

  constructor(private sanitizer: DomSanitizer,private invoiceService: InvoiceService) {}

  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.selectedFile = target.files[0];

      // Check if the selected file is a PDF
      if (this.selectedFile.type === 'application/pdf') {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.fileURL = this.sanitizer.bypassSecurityTrustResourceUrl(e.target?.result as string);
        };
        reader.readAsDataURL(this.selectedFile);
      } else {
        alert('Please select a PDF document.');
        this.selectedFile = null; // Reset selected file if it's not a PDF
        this.fileURL = null; // Reset file URL
      }
    }
  }
//upload logic
  uploadFile(): void {
    if (this.selectedFile) {
      const formData=new FormData();
      formData.append('file',this.selectedFile);
      this.invoiceService.uploadInvoice(formData,).subscribe(
  (response)=>{
    console.log('file uploaded successfully:',response);
    this.feedbackMessage='Document successfully sent to insurance';
    this.selectedFile =null;
    this.fileURL =null;
     // Clear the file input field
     const fileInput: HTMLInputElement = document.querySelector('input[type="file"]')!;
     fileInput.value = '';  // Clear the file input field


   setTimeout(() => {
        this.feedbackMessage = null;
      }, 5000);
    },
    (error)=>{
      console.error('error uploading file:',error);
      this.feedbackMessage ='Failed to upload document';
      setTimeout(() =>{
        this.feedbackMessage =null;
      },5000);
    }
);
  }else{
    alert('no file selected.');
  }
}
}
