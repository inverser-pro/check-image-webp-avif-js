(()=>{
 const d=document;
 function s(e){return d.querySelector(e)};
 function a(e){return d.querySelectorAll(e)};
 const o={},all={}
 o.n=s('.m-b-medium').innerText;
 o.d=s('.lead').innerText;
 o.t=s('.col-sm-6.col-lg-5.offset-lg-1 p.lead.m-b-xsmall b').innerText;
 o.td=s('.col-sm-6.col-lg-5.offset-lg-1 h1.lead.m-b-0').innerText;
 // if free > //
  o.bt=s('.landing-course__price.m-t-2.m-t-sm-3 b.text-bold:not(span)').innerText;






 // if free > //
 o.bt=o.bt.replace('₽','').trim()
 all.b3_=a('.row.print-no-wrap .col-sm-4.d-flex.align-items-baseline p.m-l-2');




 //all.b4_=a('section.section .section-block.section-block_no-indents-bottom.m-t-xlarge .section-block__content .row.m-t-sm-n-8.justify-content-center.print-no-wrap .col-sm-3.m-t-sm-8.text-center p.t-medium b');

 all.b4_=a('section.section .section-block.section-block_no-indents-bottom.m-t-xlarge .section-block__content .text-center p.t-medium b');




 // if free > //
 o.pd=s('#program-anchor .section-block__subheader p.lead').innerText;



 all.forUlHeader=a('.section-block__content .row.offset-sm-2 .col-sm-10 .collapse b.t-18');

 o.b3=[
  {
   "i": "calendar|1792",
   "t": all.b3_[0].innerText.split('\n').join('<br>')
  },{
   "i": "timer|256",
   "t": all.b3_[1].innerText.split('\n').join('<br>')
  },{
   "i": "winner|64",
   "t": all.b3_[2].innerText.split('\n').join('<br>')
  }
 ]

 o.b4=[];
 for(const el of all.b4_){
  o.b4.push(el.innerText)
 }

 o.pul=[];
 all.forUlContent=a('.section-block__content .row.offset-sm-2 .col-sm-10 .collapse .collapse__content ul');
 for(let i=0;i<all.forUlHeader.length-1;i++){
  let ulAr=[];
  if(all.forUlContent[i]?.innerText) {
   ulAr=all.forUlContent[i].innerText.split('\n')
  }
  o.pul.push([all.forUlHeader[i].innerText,ulAr])
 }

 o.pulb=[
  all.forUlHeader[all.forUlHeader.length-1].innerText,
  s('.section-block__content .row.offset-sm-2 .col-sm-10 div .collapse .collapse__content.p-l-0 p').innerText
 ]
 o.doc="/images/crs/courses-doc-3.jpg";

 all.res=a('ul.row.list-icons.list-icons_size-medium li.col-sm-6')
 o.res=[]
 for(const el of all.res){
  o.res.push(el.innerText)
 }
 console.log(o)
})()
