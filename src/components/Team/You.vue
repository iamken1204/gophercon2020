<template>
  <div id="you">
    <div class="staff-spotlight">
      <div
        v-show="!captured"
        class="frame"
      >
        <video
          id="preview"
          class="preview"
          muted="true"
          height="1200"
          width="1200"
          autoplay
          playsinline
        />
        <img id="define-img" class="define" src="https://golang.tw/2020/img/define.jpg"/>
      </div>
      <canvas
        id="snapshot"
        v-show="captured"
        class="snapshot"
        height="640"
        width="640"
      />
      <div v-if="!captured" class="capture-btn" @click="captureMedia()">
        <font-awesome-icon :icon="['fas', 'camera']"/>
      </div>
      <div v-else class="capture-btn" @click="downloadImg()">
        <font-awesome-icon :icon="['fas', 'download']"/>
      </div>
      <p class="paragraph">提示：此頁面將使用您的相機鏡頭拍攝大頭照，請先授與我們您的相機使用權限。</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Route } from 'vue-router';
import { Component, Watch, Vue } from 'vue-property-decorator';

@Component
export default class You extends Vue {
  private preview!: HTMLMediaElement;
  private snapshot!: HTMLCanvasElement;
  private videoTracks!: any;
  private captured: boolean = false;

  @Watch('$route')
  public onChangeRoute (route: Route) {
    if (route.name !== 'Team/Video') {
      this.turnOffCapture();
    }
  }

  public mounted () {
    this.prepareEnviorment();
    this.setupCamera();
  }

  public destroyed () {
    this.turnOffCapture();
  }

  private prepareEnviorment (): void {
    this.preview = document.querySelector('#preview') as HTMLMediaElement;
    this.snapshot = document.querySelector('#snapshot') as HTMLCanvasElement;
  }

  private setupCamera (): void {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(this.previewMedia);
  }

  private previewMedia (stream: any): void {
    this.preview.srcObject = stream;
    this.videoTracks = stream.getVideoTracks();
  }

  private captureMedia (): void {
    const dpr = window.devicePixelRatio || 1;

    this.snapshot.height = 640 * dpr;
    this.snapshot.width = 640 * dpr;
    const ctx = this.snapshot.getContext('2d') as CanvasRenderingContext2D;

    const sourceHeight = (this.preview as any).videoHeight;
    const sourceWidth = (this.preview as any).videoWidth;

    if (sourceWidth > sourceHeight) {
      ctx.drawImage(
        this.preview as CanvasImageSource,
        (sourceWidth - sourceHeight) / 2, 0, sourceHeight, sourceHeight,
        0, 0, 640 * dpr, 640 * dpr
      );
    } else {
      ctx.drawImage(
        this.preview as CanvasImageSource,
        0, (sourceHeight - sourceWidth) / 2, sourceWidth, sourceWidth,
        0, 0, 640 * dpr, 640 * dpr
      );
    }

    const defineImg = new Image();
    defineImg.src = (document.querySelector('#define-img') as HTMLImageElement).src;

    ctx.drawImage(defineImg, 0, 0, 1280, 128, 0, (640 - 64) * dpr, 640 * dpr, 64 * dpr);

    ctx.rect(0, 0, 640 * dpr, 640 * dpr);
    ctx.clip();
    this.captured = true;
  }

  private turnOffCapture () {
    this.videoTracks.forEach((track: any) => {
      track.stop();
    });
  }

  private downloadImg (): void {
    const fakeLink = document.createElement('a');
    this.snapshot.toBlob((blob) => {
      fakeLink.href = URL.createObjectURL(blob);
      fakeLink.download = 'avatar.png';
      fakeLink.click();
    });
  }
}
</script>
