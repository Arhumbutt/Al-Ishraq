import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight'
})
export class HighlightPipe implements PipeTransform {
  transform(text: string, search): string {
    const pattern = search
      .replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")
      .split(' ')
      .filter(t => t.length > 0)
      .join('|');
    const regex = new RegExp(pattern, 'gi');

    return search ? text.replace(regex, match => `<span class="search-highlight">${match}</span>`) :
      text;
  }
}
@Pipe({
  name: 'textsplit'
})
export class TextSplitPipe implements PipeTransform {
  // transform(text: string, search): string {
  //   const pattern = search
  //     .replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")
  //     .split(' ')
  //     .filter(t => t.length > 0)
  //     .join('|');
  //   const regex = new RegExp(pattern, 'gi');

  //   return search ? text.replace(regex, match => `<span class="search-highlight">${match}</span>`) :
  //     text;
  // }
  
  transform(value: string): string {
    const splitBy = '-'
    const splittedText = value.split( splitBy );
    return `${ splittedText[0] }`;
  }
}



//in ts file
// search(event) {

//   if (event.query) {
//     this.toHighlight = event.query;
//     this.results = this.data.filter(option => {
//       return option.Path.toLowerCase().indexOf(event.query.toLowerCase())
//         >= 0
//     });
//   } else {
//     this.results = this.data.slice();
//   }
// }