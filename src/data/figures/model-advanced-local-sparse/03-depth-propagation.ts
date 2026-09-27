import {Panel,C,grid,type FigureSpec,type Locale} from '@llm-systems/viz';

export default {
  articleId:'model-advanced-local-sparse',figureId:'03-depth-propagation',number:'ma-04-03',layout:'wide',
  eyebrow:['그림 3 · 층을 통한 전달','Figure 3 · Across layers'],
  title:['먼 위치의 정보도 중간 위치를 거쳐 전달됩니다','Distant information can travel through intermediate positions'],
  subtitle:['Window 3: 이전 층의 같은 위치와 직전 두 위치 · L0는 입력 · L1…L3는 층 깊이','Window 3: same position and two preceding positions in the previous layer · L0 is the input · L1…L3 are layer depths'],
  caption:['한 층을 지날 때 오른쪽으로 최대 두 위치까지 전달됩니다. 강조한 경로는 L0,p1 → L1,p3 → L2,p5 → L3,p7입니다. 따라서 L3,p7은 입력 p1…p7의 영향을 받을 수 있지만 p0은 아직 도달하지 못합니다. 간접 전달은 원래 KV를 직접 읽는 것과 같은 정보 보존을 보장하지 않습니다.','Each layer can move information at most two positions to the right. The highlighted path is L0,p1 → L1,p3 → L2,p5 → L3,p7. Thus L3,p7 can be influenced by input positions p1…p7, but p0 is still out of reach. Indirect propagation does not guarantee the same information preservation as directly reading the original KV.'],
  alt:['가로축은 위치 0부터 7, 세로축은 아래 L0에서 위 L3로 증가하는 층 깊이다. L3,p7의 조상 위치만 강조하며 주황 경로는 L0,p1에서 L1,p3, L2,p5를 거쳐 L3,p7로 이어진다. 모바일은 그 경로를 세로로 펼친다. 아래 표에서 p7의 L0 입력 영향 범위는 한 층 후 5…7, 두 층 후 3…7, 세 층 후 1…7이다.','Horizontal axis is position 0–7; depth increases upward from L0 to L3. Only ancestors of L3,p7 are highlighted. One orange path connects L0,p1, L1,p3, L2,p5, and L3,p7; mobile unfolds this path vertically. The table shows possible L0 input influence on p7: positions 5–7 after one layer, 3–7 after two, and 1–7 after three.'],
  sources:[{label:'Mistral 7B §2, stacked sliding-window attention',url:'https://arxiv.org/html/2310.06825v1#S2'}],
  panels(locale:Locale,mobile?:boolean){
    const width=mobile?520:1104,p=new Panel(locale,null,mobile?1310:1390,width);
    p.text(0,32,mobile?['한 경로를 아래에서 위로 따라갑니다.','Follow one path from bottom to top.']:['강조한 위치는 L3,p7에 영향을 줄 수 있습니다.','Highlighted positions can influence L3,p7.'],{size:26,weight:600,width});
    const ys=[662,482,302,122],pathPositions=[1,3,5,7];
    if(mobile){
      for(let l=0;l<4;l++){
        const x=220,y=ys[l];
        p.token(x,y,`L${l} · p${pathPositions[l]}`,230,l===3?'blue':'orange',70);
        if(l<3){
          p.arrow(x+115,y-8,x+115,ys[l+1]+78,C.orange);
          p.text(150,y-55,['위치 +2','Position +2'],{size:23,color:C.orange,anchor:'middle',width:180});
        }
      }
      p.arrow(35,729,35,115,C.muted);
      p.text(10,94,['층 깊이','Depth'],{size:23,color:C.muted,width:190});
      p.text(260,800,['주황: 가능한 전달 경로 하나','Orange: one possible path'],{size:24,color:C.orange,weight:600,anchor:'middle',width:500});
    }else{
      const center=(j:number)=>170+j*124;
      for(let l=0;l<4;l++)for(let j=0;j<8;j++){
        const active=j>=1+2*l,path=j===pathPositions[l],final=l===3&&j===7;
        const tone=final?'blue':path?'orange':active?'teal':'gray';
        p.token(center(j)-40,ys[l],`p${j}`,80,tone,70);
      }
      for(let l=0;l<3;l++)p.path(`M${center(pathPositions[l])} ${ys[l]-8} L${center(pathPositions[l+1])} ${ys[l+1]+78}`,C.orange,4,false,true);
      for(let l=0;l<4;l++)p.text(104,ys[l]+45,`L${l}`,{size:27,color:C.muted,weight:600,anchor:'end',width:64});
      p.arrow(24,731,24,114,C.muted);
      p.text(0,86,['층 깊이','Depth'],{size:24,color:C.muted,width:150});
      p.arrow(130,784,1080,784,C.muted);
      p.text(605,825,['토큰 위치 →','Token position →'],{size:25,color:C.muted,anchor:'middle',width:500});
      p.text(550,886,['주황: 가능한 경로 하나 · 초록: 그 밖의 조상 위치','Orange: one possible path · Teal: other ancestor positions'],{size:24,color:C.muted,anchor:'middle',width:1080});
    }
    const top=mobile?904:970;
    p.line(0,top-25,width,top-25,C.line,1);
    p.text(0,top+15,['p7에 영향을 줄 수 있는 입력(L0)의 범위','Possible L0 input influence on position p7'],{size:25,weight:600,width});
    const gx=mobile?140:390,gy=top+115,cell=mobile?38:52,gap=4;
    p.text(gx+(8*(cell+gap)-gap)/2,top+74,['입력 위치 j','Input position j'],{size:23,color:C.muted,anchor:'middle',width:360});
    const g=grid(p,gx,gy,3,8,{cell,gap,tone:(r,c)=>c>=5-2*r?'teal':null});
    for(let j=0;j<8;j++)p.text(g.cellX(j)+cell/2,gy-12,String(j),{size:22,color:C.muted,anchor:'middle',width:cell});
    for(let r=0;r<3;r++)p.text(gx-18,g.cellY(r)+cell/2+8,`L${r+1}, p7`,{size:23,weight:600,anchor:'end',width:120});
    p.text(width/2,gy+g.height+64,['p0은 세 층으로 아직 도달하지 못합니다.','p0 is still out of reach after three layers.'],{size:25,weight:600,color:C.muted,anchor:'middle',width:width-20});
    return [p];
  },
} satisfies FigureSpec;
