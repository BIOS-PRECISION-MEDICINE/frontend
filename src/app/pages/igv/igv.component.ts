import {
  Component,
  ViewChild,
  ElementRef,
  OnDestroy,
  AfterViewInit,
} from '@angular/core';

declare var igv: any;

@Component({
  selector: 'app-igv',
  templateUrl: './igv.component.html',
  styleUrls: ['./igv.component.css'],
})
export class IgvComponent implements AfterViewInit, OnDestroy {
  @ViewChild('igvdiv') igvDiv!: ElementRef;
  browser: any;
  trackUrl =
    'https://www.encodeproject.org/files/ENCFF356YES/@@download/ENCFF356YES.bigWig';

  options_default = {
    genome: 'hg19',
  };

  options_alignments = {
    reference: {
      id: 'hg19',
      fastaURL:
        'https://s3.amazonaws.com/igv.broadinstitute.org/genomes/seq/1kg_v37/human_g1k_v37_decoy.fasta',
      cytobandURL:
        'https://s3.amazonaws.com/igv.broadinstitute.org/genomes/seq/b37/b37_cytoband.txt',
    },
    locus: '8:128,750,948-128,751,025',
    tracks: [
      {
        name: 'Phase 3 WGS variants',
        type: 'variant',
        format: 'vcf',
        url: 'https://s3.amazonaws.com/1000genomes/release/20130502/ALL.wgs.phase3_shapeit2_mvncall_integrated_v5b.20130502.sites.vcf.gz',
        indexURL:
          'https://s3.amazonaws.com/1000genomes/release/20130502/ALL.wgs.phase3_shapeit2_mvncall_integrated_v5b.20130502.sites.vcf.gz.tbi',
      },
      {
        type: 'alignment',
        format: 'cram',
        url: 'https://s3.amazonaws.com/1000genomes/phase3/data/HG00096/exome_alignment/HG00096.mapped.ILLUMINA.bwa.GBR.exome.20120522.bam.cram',
        indexURL:
          'https://s3.amazonaws.com/1000genomes/phase3/data/HG00096/exome_alignment/HG00096.mapped.ILLUMINA.bwa.GBR.exome.20120522.bam.cram.crai',
        name: 'HG00096',
        sort: {
          chr: 'chr8',
          position: 128750986,
          option: 'BASE',
          direction: 'ASC',
        },
        height: 600,
      },

      {
        name: 'Genes',
        type: 'annotation',
        format: 'bed',
        url: 'https://s3.amazonaws.com/igv.broadinstitute.org/annotations/hg19/genes/refGene.hg19.bed.gz',
        indexURL:
          'https://s3.amazonaws.com/igv.broadinstitute.org/annotations/hg19/genes/refGene.hg19.bed.gz.tbi',
        order: Number.MAX_VALUE,
        visibilityWindow: 300000000,
        displayMode: 'EXPANDED',
      },
    ],
  };

  options_interact = {
    reference: {
      id: 'hg19',
      name: 'Human (CRCh37/hg19)',
      fastaURL:
        'https://s3.dualstack.us-east-1.amazonaws.com/igv.broadinstitute.org/genomes/seq/hg19/hg19.fasta',
      indexURL:
        'https://s3.dualstack.us-east-1.amazonaws.com/igv.broadinstitute.org/genomes/seq/hg19/hg19.fasta.fai',
      cytobandURL:
        'https://s3.dualstack.us-east-1.amazonaws.com/igv.broadinstitute.org/genomes/seq/hg19/cytoBand.txt',
    },
    locus: 'chr2:65,222,853-65,826,902',
    tracks: [
      {
        url: 'https://s3.amazonaws.com/igv.org.demo/GSM1872886_GM12878_CTCF_PET.bedpe.txt',
        type: 'interact',
        format: 'bedpe',
        name: 'bedpe - proportional',
        arcType: 'proportional',
        color: 'rgb(0,200,0)',
        alpha: '0.05',
        logScale: true,
        showBlocks: true,
        max: 80,
        visibilityWindow: 10000000,
        height: 100,
      },
      {
        name: 'GM12878 CTCF ',
        url: 'https://www.encodeproject.org/files/ENCFF000ARJ/@@download/ENCFF000ARJ.bigWig',
        format: 'bigwig',
        type: 'wig',
        color: 'black',
        height: 50,
      },
      {
        url: 'https://s3.amazonaws.com/igv.org.demo/GSM1872886_GM12878_CTCF_PET.bedpe.txt',
        type: 'interact',
        format: 'bedpe',
        name: 'bedpe - nested',
        arcType: 'nested',
        arcOrientation: false,
        color: 'blue',
        showBlocks: true,
        visibilityWindow: 10000000,
        height: 100,
      },
    ],
  };

  options_segmented = {
    genome: 'hg19',
    showSampleNames: true,
    tracks: [
      {
        name: 'Explicit Samples',
        type: 'seg',
        format: 'seg',
        samples: [
          'TCGA-06-0168-01A-02D-0236-01',
          'TCGA-02-0115-01A-01D-0193-01',
          'TCGA-02-2485-01A-01D-0784-01',
          'TCGA-06-0151-01A-01D-0236-01',
        ],
        url: 'https://s3.amazonaws.com/igv.org.demo/GBM-TP.seg.gz',
        height: 100,
      },
      {
        name: 'Segmented Copy Number',
        type: 'seg',
        format: 'seg',
        url: 'https://s3.amazonaws.com/igv.org.demo/GBM-TP.seg.gz',
      },

      {
        name: 'Indexed',
        type: 'seg',
        format: 'seg',
        url: 'https://s3.amazonaws.com/igv.org.demo/GBM-TP.seg.gz',
        indexURL: 'https://s3.amazonaws.com/igv.org.demo/GBM-TP.seg.gz.tbi',
      },
      {
        name: 'Indexed with visibility window',
        type: 'seg',
        format: 'seg',
        url: 'https://s3.amazonaws.com/igv.org.demo/GBM-TP.seg.gz',
        indexURL: 'https://s3.amazonaws.com/igv.org.demo/GBM-TP.seg.gz.tbi',
        visibilityWindow: '100000000',
      },
    ],
  };

  options_vcf = {
    locus: 'chr22',
    genome: 'hg38',
    tracks: [
      {
        url: 'https://s3.amazonaws.com/igv.org.demo/nstd186.GRCh38.variant_call.vcf.gz',
        indexURL:
          'https://s3.amazonaws.com/igv.org.demo/nstd186.GRCh38.variant_call.vcf.gz.tbi',
        name: 'Color by function, SVTYPE',
        visibilityWindow: -1,
        color: function (variant: any) {
          const svtype = variant.info['SVTYPE'];
          switch (svtype) {
            case 'DEL':
              return '#ff2101';
            case 'INS':
              return '#001888';
            case 'DUP':
              return '#028401';
            case 'INV':
              return '#008688';
            case 'CNV':
              return '#8931ff';
            case 'BND':
              return '#891100';
            default:
              return '#002eff';
          }
        },
      },
      {
        url: 'https://s3.amazonaws.com/igv.org.demo/nstd186.GRCh38.variant_call.vcf.gz',
        indexURL:
          'https://s3.amazonaws.com/igv.org.demo/nstd186.GRCh38.variant_call.vcf.gz.tbi',
        name: 'Color by table, SVTYPE',
        visibilityWindow: -1,
        colorBy: 'SVTYPE',
        colorTable: {
          DEL: '#ff2101',
          INS: '#001888',
          DUP: '#028401',
          INV: '#008688',
          CNV: '#8931ff',
          BND: '#891100',
          '*': '#002eff',
        },
      },
      {
        url: 'https://s3.amazonaws.com/igv.org.demo/nstd186.GRCh38.variant_call.vcf.gz',
        indexURL:
          'https://s3.amazonaws.com/igv.org.demo/nstd186.GRCh38.variant_call.vcf.gz.tbi',
        name: 'Color by REGIONID',
        colorBy: 'REGIONID',
        visibilityWindow: -1,
      },
      {
        url: 'https://s3.amazonaws.com/igv.org.demo/nstd186.GRCh38.variant_call.vcf.gz',
        indexURL:
          'https://s3.amazonaws.com/igv.org.demo/nstd186.GRCh38.variant_call.vcf.gz.tbi',
        name: 'Color by ALT',
        colorBy: 'ALT',
        colorTable: {
          '<DEL>': '#ff2101',
          '<INS>': '#001888',
          '<DUP>': '#028401',
          '<INV>': '#008688',
          '<CNV>': '#8931ff',
          '<BND>': '#891100',
          '*': '#002eff',
        },
        visibilityWindow: -1,
      },
      {
        url: 'https://s3.amazonaws.com/igv.org.demo/nstd186.GRCh38.variant_call.vcf.gz',
        indexURL:
          'https://s3.amazonaws.com/igv.org.demo/nstd186.GRCh38.variant_call.vcf.gz.tbi',
        name: 'Color by FILTER',
        colorBy: 'FILTER',
        colorTable: {
          FAIL: '#ff2101',
          PASS: '#028401',
          '.': '#891100',
          '*': '#002eff',
        },
        visibilityWindow: -1,
      },
      {
        url: 'https://s3.amazonaws.com/igv.org.demo/nstd186.GRCh38.variant_call.vcf.gz',
        indexURL:
          'https://s3.amazonaws.com/igv.org.demo/nstd186.GRCh38.variant_call.vcf.gz.tbi',
        name: 'Default Color',
        visibilityWindow: -1,
      },
    ],
  };

  constructor() {}

  async createDefaultBrowser() {
    try {
      this.browser = await igv.createBrowser(
        this.igvDiv.nativeElement,
        this.options_default
      );
    } catch (e) {
      console.log(e);
    }
  }

  addTrackByUrl() {
    this.browser.loadTrack({
      url: this.trackUrl,
    });
  }

  async createAlignmentsBrowser() {
    var igvDiv = document.getElementById('igvDiv2');

    igv
      .createBrowser(igvDiv, this.options_alignments)
      .then(function (res: string) {
        console.log('Created IGV browser' + res);
      });
  }

  async createInteractBrowser() {
    var igvDiv = document.getElementById('igvDiv2');
    igv.createBrowser(igvDiv, this.options_interact);
  }

  async createVcfBrowser() {
    var igvDiv = document.getElementById('igvDiv2');
    igv
      .createBrowser(igvDiv, this.options_vcf)

      .then(function (res: string) {
        console.log('Created IGV browser' + res);
      });
  }

  async createSegmentedBrowser() {
    var igvDiv = document.getElementById('igvDiv2');
    igv
      .createBrowser(igvDiv, this.options_segmented)
      .then(function (res: string) {
        console.log('Created IGV browser' + res);
      });
  }

  drawTrianglerect(context: any, x: any, y: any, w: any, h: any) {
    let n = Math.floor(w / h);
    let p = (w % h) / 2;

    context.clearRect(x, y, w, h);
    context.fillRect(x, y, w, h / 2);

    for (var i = 0; i < n; i++) {
      this.drawTriangle(context, p + x + i * h, y, h, h);
    }
  }

  drawTriangle(context: any, x: any, y: any, w: any, h: any) {
    // context.clearRect(x:any, y:any, w:any, h:any)

    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x + w / 2, y + h);
    context.lineTo(x + w, y);
    context.closePath();
    context.fill();
  }

  drawCirclerect(context: any, x: any, y: any, w: any, h: any) {
    let n = Math.floor(w / h);
    let p = (w % h) / 2;

    context.clearRect(x, y, w, h);
    context.fillRect(x, y, w, h / 2);

    for (var i = 0; i < n; i++) {
      this.drawCircle(context, p + x + i * h, y, h, h);
    }
  }

  drawCircle(context: any, x: any, y: any, w: any, h: any) {
    // context.clearRect(x:any, y:any, w:any, h:any)

    context.beginPath();
    context.arc(x + w / 2, y + h / 2, h / 2, 0, 2 * Math.PI);
    context.fill();
  }

  drawRoundrect(context: any, x: any, y: any, w: any, h: any) {
    let radius = 5;
    context.clearRect(x, y, w, h);
    context.beginPath();
    context.moveTo(x + radius, y);
    context.lineTo(x + w - radius, y);
    context.quadraticCurveTo(x + w, y, x + w, y + radius);
    context.lineTo(x + w, y + h - radius);
    context.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
    context.lineTo(x + radius, y + h);
    context.quadraticCurveTo(x, y + h, x, y + h - radius);
    context.lineTo(x, y + radius);
    context.quadraticCurveTo(x, y, x + radius, y);
    context.closePath();
    // context.stroke()
    context.fill();
  }

  ngAfterViewInit(): void {
    //this.createDefaultBrowser();
    //this.createAlignmentsBrowser();
    //this.createInteractBrowser();
    //this.createSegmentedBrowser();
    this.createVcfBrowser();
  }

  ngOnDestroy(): void {
    igv.removeAllBrowsers();
  }
}
