import {Injectable} from '@angular/core';

interface Scripts {
  name: string;
  src: string;
}

export const ScriptStore: Scripts[] = [
  {name: 'functions', src: './assets/js/functions.js'},
  {name: 'tiny-slider', src: './assets/vendor/tiny-slider/tiny-slider.js'},
  {name: 'bootstrap.bundle.min', src: './assets/vendor/bootstrap/dist/js/bootstrap.bundle.min.js'},
  {name: 'flatpickr', src: './assets/vendor/flatpickr/js/flatpickr.min.js'},
  {name: 'glightbox', src: './assets/vendor/glightbox/js/glightbox.js'},
  {name: 'choices', src: './assets/vendor/choices/js/choices.min.js'},
  {name: 'aos', src: './assets/vendor/aos/aos.js'},
  {name: 'sticky', src: './assets/vendor/sticky-js/sticky.min.js'},
  {name: 'dropzone', src: './assets/vendor/dropzone/js/dropzone.js'},
  {name: 'quill', src: './assets/vendor/quill/js/quill.min.js'},
  {name: 'bs-stepper', src: './assets/vendor/stepper/js/bs-stepper.min.js'},
  {name: 'nouislider', src: './assets/vendor/nouislider/nouislider.min.js'},

];
declare var document: any;

@Injectable({
  providedIn: 'root'
})
export class DynamicScriptLoaderService {

  private scripts: any = {};

  constructor() {
    ScriptStore.forEach((script: any) => {
      this.scripts[script.name] = {
        loaded: false,
        src: script.src
      };
    });
  }

  load(...scripts: string[]) {
    const promises: any[] = [];
    scripts.forEach((script) => promises.push(this.loadScript(script)));
    return Promise.all(promises);
  }

  loadScript(name: string) {
    return new Promise((resolve, reject) => {
      if (!this.scripts[name].loaded) {
        //load script
        let script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = this.scripts[name].src;
        if (script.readyState) {  //IE
          script.onreadystatechange = () => {
            if (script.readyState === "loaded" || script.readyState === "complete") {
              script.onreadystatechange = null;
              this.scripts[name].loaded = true;
              resolve({script: name, loaded: true, status: 'Loaded'});
            }
          };
        } else {  //Others
          script.onload = () => {
            this.scripts[name].loaded = true;
            resolve({script: name, loaded: true, status: 'Loaded'});
          };
        }
        script.onerror = (error: any) => resolve({script: name, loaded: false, status: 'Loaded'});
        document.getElementsByTagName('head')[0].appendChild(script);
      } else {
        resolve({script: name, loaded: true, status: 'Already Loaded'});
      }
    });
  }

  unload(...scripts: string[]) {
    const promises: any[] = [];
    scripts.forEach((script) => promises.push(this.unloadScript(script)));
    return Promise.all(promises);
  }

  unloadScript(name: string) {
    return new Promise((resolve, reject) => {
      if (this.scripts[name] && this.scripts[name].loaded) {
        // Reset the loaded status of the script
        this.scripts[name].loaded = false;
        const scriptElements = document.getElementsByTagName('script');
        for (let i = 0; i < scriptElements.length; i++) {
          const script = scriptElements[i];
          if (script.src.includes(this.scripts[name].src)) {
            script.remove();
            resolve({script: name, loaded: false, status: 'Unloaded'});
            return;
          }
        }
      }
      resolve({script: name, loaded: false, status: 'Not Found'});
    });
  }

}
