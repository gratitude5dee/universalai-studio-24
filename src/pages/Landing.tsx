
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useMotionValue, useTransform, useAnimation } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link2, Zap, Sparkles, Palette, BookOpen, Brain, Headphones, ExternalLink } from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const controls = useAnimation();
  const [isLoading, setIsLoading] = useState(true);
  const [typedText, setTypedText] = useState("");
  const fullText = "Cultivate your Creator";

  // ASCII animation effect
  useEffect(() => {
    // Simulate loading screen with ASCII animation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Typing effect implementation
  useEffect(() => {
    if (!isLoading && typedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.substring(0, typedText.length + 1));
      }, 100); // Adjust typing speed here

      return () => clearTimeout(timeout);
    }
  }, [typedText, isLoading, fullText]);

  // Handle mouse movement for the entire container (subtle effect)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Calculate distance from center (normalized from -1 to 1)
      const moveX = (e.clientX - centerX) / (rect.width / 2);
      const moveY = (e.clientY - centerY) / (rect.height / 2);

      // Apply subtle movement
      x.set(moveX * 5);
      y.set(moveY * 5);
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Run entrance animation
    controls.start({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [x, y, controls]);

  // Card tilt effect values
  const rotateX = useTransform(y, [-5, 5], [5, -5]);
  const rotateY = useTransform(x, [-5, 5], [-5, 5]);

  // ASCII Loading Screen Component
  const AsciiLoadingScreen = () => {
    const asciiFrames = [`
BBBMWBBBBBB8%BBBBBBBBBBBBB#%BBBBBB%BBBBBBBBBBBBBBhBBBBBBBBBBBBBB%8%BBBB%&%%%%%%%%%%%%%&M%%%%%%88888%%%88%%%%%*W8%%%%%8888888W888888%#88%%%%%888888%h&888888888%%%%8888888%888%%%%8&888%%88%%%%%%MW%%%%%%%%%%%BBB%%%%%%%W%BBBBBBBBBBBBBkBBBBBBBBBBBBBBWBBBBBBB*BBBBBBBBBBBBBBBBBBBBB&WBBB
BBB88BBBBBBM8BBBBBB%BBBBBB&BBBBBBB&BBBBBBBBBBBBBBaBBBBBBBBBBBBBBB%BBBBB8W%%%%%%%%%%%%%&M8%%%%%88%%%%%%88%%%%%*W%%%%%88888888&888888%*88888%8&88888%k&8888888888888888%%%%%8&8888%8&8888888888%%%MW8%%%%%%%%%%%%B%%%%%%%&%%BBBBB%BBBBBBkBBBBBBBBBBBBBBMBBBBBBB#BBBBBBBBBBBBBB%BBBBBBW#BBB
BBBBBBBBBBB#8BBBBBB%%BBBBB%BBBBBBBMBBBBBBB%BBBBBB*BBBB%%%%%%%%%%%&%%%%%&#%%%%%88888888WM888888&8888888&888888oW888888&&&&&8&W&&&88&&o&&&888&&&&&8&8k&&&888&&&&8888&&&&8888&&888888&88888&&888888MW8888888888888888888%8W%%%%%%%%%%%%%%a%%%%%%%%BBBBBBoBBBBBBB&BBBBBBBBBBBBB%8BBBBBBW#BBB
BBB@BBBBBBB*&BBBBBBBBBBBBBBBBBBBBB*BBBBBBBBBBBBBBWBBBB%BBB%%%%BBB8%%%%%8#%%%%%%%%%%%%%&W%%%%%%888%8%%%888%%%%*W8888888888888&8888888*88888888888888k&&8888888888888&888888888888888888888&88888%WW8%%%%%%%%%%%%%%%%%%%%8%%%%%%BBBBBBBB*BB%%BBB%BBBBBBoBBBBBBB%BBBBBBBBBBBBB%WBBBBBB&WBBB
BBBBBBBBBB@M8BBBBBBBBBBBBB@BBBBBBBaBBBBBBBBBBBBBB8BBBBBBB%%%%%BB%8%%%%%&*%%%%%%%%%%%%%8&%%%%%au)(((((((((((((1((t8888&88888U(((((((({1)11w88&8oc|((}1))))))))))(Mx()))))))))(()))(tp8888&&888888W&8%%%%%88%%%%%88%%%%%%%%%%%%%B%BBBBBBWBBBBBBB%BBBBBBhBBBBBBBBBBBBBBBBBBBBB8#BBBBBB%%BBB
BBBBBBBBBB@8%B%XiYB%BBBBBB@BBBBBBBaBBBBBBB%BBBBBB%%BB%BBB8%%%%%%%&%%%%%&o%%%%%%%888%%%8&8%%%%p)<                ;8888&&8888Xl!            :oWWw(>            "  #(_"              ,Q8888&W888888&&8%%88%88%%%%%&8%%%%%%%%%%%%BB%BBBBBB8BBBBBBBBBBBBBBkBBBBBBBBBBBBBBBBBBBBB8*BBBBB@BBBBB
BBBB%BBBBBB%B:a<Ynck%BBBBBBB8ZBBBBhBBBBBBB&ZBBBB%B%%%%%B%&%BBBBB%&%%%%%&o%%%%%%88888888&88888q1!;   ::::;;;:;,  :W&&&&&&&&&z; :  ",::::,"   "qZ)i:  ",,,,::::;" o)~    ,::::::::, "C&&&8WM&&&888&&88888888888%%M&8%%%%%%888%%%%%%%%%%%%%%%%%%B%BBBBBBk%BBBBBBBBBBBBB%BBBBBB8#BBBBBBBBBBB
B@@@BBBBBBBB@:aoQm|IWBkx#chI&(QQxq?&h#UCWiWU%M1dIB%%%%%B%M%%%%%B%&%%%%%&a%%%%%%88%%%%%8&88888q{l,  _zzzzzzzXYYY-;&&&&WW&&&&X; , "{vunux)~;I  <m)i: !+uvcczzzzcnz*1+" ;,jxxnnnnnnnn/Z&&&&WM&88888&&8888888888888#&8%%%%%88%%%%%%%%%%%%%%%%%%%B%%BBBBBBaBBBBBBBBBBBBBB8BBBBBB%WBBBBBBBBBBB
BBBBBBBBBBB@BJ ,]1!"WBMCdh&L%dobBOJ%8aCkOC&wwbCMLB%%%%%%%#%%%%%%%&%%%%%&a88%%%%8888888&&88888q{I   lXwMWWW&&&*M&&&&&&&&&&88X; ,  rMMM&&O~;l  <Z1!: ,<o&&&&&W&&&&&}-"": aWW&&&&&&&&&&&&&&WM&&8888&&8888%%88888%%oW8888%88888%%%8%%%%%%%B%BBBBB8%BBBBBB#BBBBBBBBBBBBBBWBBBBBBB%BBBBBBBBBBB
BBBBBBBBBBBBBBB8oo#a8BBBBBBBBBBBBBB%%%%%%%M%%BBBBB%%%%%%%o%%%%%%8W8%%%%Wo888%8888888%%8&88888q1I ;          "YMWW&&&&W&&&8&zI ,  r&&M88Z+;l  <0{!,  ";IIIIIIIIIqW}?:"  ;IIIII;;I-h&&&&&&M#&&888&&&888888&&88888aW8888888888888&888%%%%%%%%%%%W%%%%%%BW%BBBBBB%BBBBB%*BBBBBBBBBBBBBBBBBBB
BBBBBBBBBBBBBBBBBBBo%BBBBBBBBBBBBBB%BBBBBB*%%%%B%B%%%%%%%a%%%%%%%W8%8%%Wo8888888888888&&&&888q(I   , """,,:    C#[       {WXI ,  r&8W88O~Il  <0{i"             O*[-:"           iaW&&&&&M#&&88&8&&8888888888888oW888%88888888%M8%%%%%%%%%%%%%#%%%%%BB8%%%BBBB%%BBBB%aBBBBBBBBBBBBBBBBBBB
BBBB8%BBBBBBBBBBBBB*%BBBBBBBBBBBBBB%BBBBBBa%%%%%%%%%%%%%8h%%%%%%8W8888%&o8888888888888&&&&&&&pf[_->,](|||)ll,   j}-"  ,  l(/l ,  r&8W&&O~;l  <0{>"  "!iiiiii!l ZM[?:" :i>>iiiiiI>oW&&&&&M*&&&&88&&888888&&88888*W888888888888%*88%%%%%%%%%%%%o%%%%%BB%%%%%BBB%BBBBB%oBBBBBBBBBBBBBBBBBBB
BBBB&8BBBBBBBBBBBBBM%BBBBBB%%BBBBBB%%%%%%%h%%%%%%%%%%%%%8h8%888%8W88888&o8888888&88888&&&&&&&*pmOQLC0hM#Mo+l,  "01?ii!l, [aY! ,  rW&WWW0~;I  <0{>" !?UCLLLLQQQLaM}?:"liC0OOOOOOmd#W&&&&&#*WW&&&&&&&88888&&88888*W8888888888888o8888%%%8%%%%%%h%%%%%%%%%%%%%BB%%%%%B%oBBBBBBBBBBBBBBBBBBB
BBBB#8BBBBBBBBBBBBB&%BBBBBB8%BBBBBB%%%%%%%k%%%%%%%8%%%%%8h8888888W88888Wo8888888&&8888&&&&&&88&&&WWWWWMMMo~I,   QkUUYXzccLWUl,:  j##MMM0+;;  <01>" ,<aMWWMMMMMMWW{];"  aWWWMWWWWWWWW&&&&#*W&&&&&&&&&888888&8888#W888888&888888a&88%%%%8%%%%%%k8%%%%%%%%%%%%%%%%%BBB%#%BBBBBBBBBBBBB%BBBB
BBBB*&BBBBBBBBBBBBB%%BBBBBBW%BB%%BB%%%%%%%k%%%%%%%88%88%8a8888888W88888&*&8&&&&8&&&&&&&&&&&&&Mx"    -O0QQC<:"   OWWWWWWWWWWYl::  -uuczzj+;:  <0)>"  _zzzXYYUCQ0ZM1[;   juCOZZO0mO0ZoW&&W#*W&&&&&&&&&&&88&&88888MW&&&&888888888h&888%%%8%%%%%%h%%%%%%%%%%%%BB&%BBBBBB&BBBBBBBBBBBBB%8BBBB
BBBB*&BBBBBBBBBBBBBB%BBBBBBo%%%%BBB%%%%%%Bh%%%%%%%88888%8o88888%8W88888&*&&&&&8&&&&&&&&&&&&&&#cl:        :,,l!" wWWWWMMWWWWY!;;"        ";>}><O)<,              *1]:"           " lOWWW&#oWW&&&&WW&&&&&8&&&&&88MW&&&&88&&&8888h&888%%%8%%%%%%a%%%%%%%%%%%%%B#%BBBBBB8BBBBBBBBBBBBB%&BBBB
&&&&aM&&&&&&W&&&WWW&W&&&&WWkWWWWWWWWWW&&&WhWWWWWWWMWWWWWMoMMWWWMM#MMM#M#o####################oX~iiiii>iii<+}|tcJh****o**oooY~!!!iiiii!!>-1fxqbZ)_iiiiii!!!!ii!" o1?lIIlll!!!!!!!l,lL****aa*****************####**#####M##MMMMMkMMWWWWWWWWWWWWaWW&&WWWWW&&&&&a&&&&&&&&8888888888888W#8888
%BBBM8BBBBBB8%BBBBBB%%%B%BBh%%%%%%%%%%%%%%*88%%%%%8888888M888888&W&&8&&&M&&&&&&&&&&&&&&&WWWWWW#oqvvvvvvvvvuxvChWWWWWMMMMMMWQvvvvvvccvcczzvp##Mpvuuvcuuuuvcccczzc#xxxxxnnnczcccczXJLkWWWW*oWWWW&&WWWW&&&WW&&&&8&WW&&&&88&&&&&88aW88888888888%%*888%%%%88%%%%%h%%%%BBBBBBBBBBBBBBBBB8#BBBB
BBBB&8BBBBBBW%BBBBBB%%%%%%%k%%%%%%%8%%%%%%M8%88%%%8888888W&&8888&M&&&&&&M&&&&&&&WWWWWW&WWWWWWWMMWWWWWWMMMMMMMh*MMMMMMMMMMMMMkMMMMMMM#MMMMMM##MMMMMMd###MMMMMMMMMMMMMMMWWW#hMMMMMMMMWWWWW*aWWWo*WajY*W&&a*0aMo&&&&&&&&8&WW&&&&8*W&&888%88888%%M888%%%%88%%%%%k%%%%BBBBBBBBBBB%BBBBB8*BBBB
BBBB8%BBBBBBM%%%%%BB%%%%%%%b%%%%%%%8%%%%%%W88888%88888888W&&&&&&WM&&&&&WM&&&&&WWWWWWWWWWMWWWWW##MMMMMMMMMMMMMh*MMMMMM#MMMMMMk#MMMMMM*####M########Md#####MM##MMMMMMMMMMMM*kMMMMMMMMMdqMmXnQ*MMMMMMMMWWWhObW*|WZwkO&&&&WWWWW&&&*W&&&&88&88888%W888%%%%8%%%%%%k%%%%%BB%%BBBBB%%BBBBB8#BBBB
WWWWMMWWWWWWhMMMMMMWMMMMMMMb#MMMMMM#######*##############********a******o*ooooo**oooooooooooooaaaoooooaaooooobhaoooaahhkddbbpaoooooohooaoooooooooo*wooooo*o*oooooooooooooabo*omjUk#whMMMMMwh#naaQfq#k0ao#MWMUWWhM&qaCJCb######o**####M####MMM##MMMMMM#MMMWWWaMWWWWWWWWWWW&&MW&&&&&W#&&&&
BBBBB%%BBBBBa8%%%%%%%%%%%%%a8%%%%%%888888%&88888888&88888&&&&&&&W#WW&WWWMWWWWWWWWMWMMMWWMMMWMM##MMMMMM####M##k{ ?--itki:<>~-La+_tz+~wbli!!!_oq?><<a0+i<<>lr*L!+[-"j###MMM*k####qMZU##M#qroCpk*WhrQO#WWWMMM&MXWMaM&&&&&*q]Z&&&&MW&&&&88&&&88888888888%888%%%%#%%%%%B%%%%BBB%W%BBBBB%&BBBB
BBBBB%BBBBBBh8%%%%%%%%%%%%%*8%%%%%%888888%888888888&&&&8&&&&&&&&W#WWWWWWMWWWWWWWMMMMMMMMMMMMMM#####MM########k<i<hC[zh*h+>nohal<cuI;mbl]QYl_ZoO+Im*L!-0w-<I0:lvbxrU######ob####qMM##*Jo*ooXdMMMhx0MMMWMkhk#*nwfLMWWWWWq*W&WW&&MWWW&&&&W&&&88888888888&88%%%%M8%%%%B%%%%BBB%M%%%BBB%8BBBB
%%%%B%%%%%%%h8%%%%%%8%%%%%%#888%%%%888888888888888&&&&&&&&&&&&&&W#WWWWWMMMWWWWMMMMMMMMMMMMMMMM#*######**####*bv(-+->1d*h+>nakhlirxI,md;?0Ul_0hO+,OoQi_OZ+l;h0|1}] _o*****ad****wo**o**aoo*czOoQYumMZxdo*MhW#)WMcwobw#WZaMWMWWWMMWWWW&MW&&&&&88&&8888&&888%%%W8%%%%%%8%%%%%%o%%%%%%%%%%%%
BBBBB%%B%BB%a8%%%%%%%%%%%%%M8%8888%888888888888888&&&8&8&&WWWWWWM*WWWWWM#MMMMMMMMMMMMMMM######**#####********b1 ;t)_(wdq_<noho!l_}<imd;<){i}Lq1<l}hQ<i-];;>m[l[/-!)******ad****Z*#aJQaa*qwXbnoQwfJoMqhM##MWa}#*ZaMMMW*YpwnMWWWMMMWWWW#W&&&&&&&&&888%W&888%%%W8%%%%%%8%%%%%%a%%BBBB%%%BBB
BBBBB%BBBBBBa8%%%%%%%%%%%%%W8aWkQhM888&WMokbLvxcQb*W&88MpC0hWWWWM*WWWWWM#MMMMMMMMMMMM#M#######**#************dhkkkkbhooobbkohaadbddhbakkkbdkahddddamkdkkkbaahpqdbkoooooo*apooooQkrUo**o***zpvaUQ1O**ou[}(t(!Jfc{Lo*ha#Lp#M#MWWWMMMWWWoWW&&&&&&&&&888M&888%%%&8%%%%%%8%%%%B%o%%%B%BB%BBBB
BBBBB%BBBBBB*8%%%%%%%%%%8W&0MWkppQ0wqppbkhaadbbbpOJUQqao***pdakkhwXzZ*zo*#MMMMMMM#############*o******ooo*ooodhooooooaaaaaaakaaaaaaakaaaaaaahhahhhaZhhhaaaahhaaaaaaaaaooohpaaaaQoohaaohpZvff<<)(())((([+{))Ij0cQZZZL)JzZ##*MMMMMMMWWWaMWWW&&&W&&&&88#&8888%%88%%%%%%%%%%BB%o%%%%BB%%%BBB
WWWWWWWWWWWWo#MMMMMM##*#&pZ8k%%%&8q8oBBBBBBBBBBBBBBBBBBB8khpZZmmwqdaaLdpZZmZhhhhkkkkkkkkkkkkkkbbbbbbbbdddddddwpdppppppqqppppqppppppdqppppppqqqqqqpp0qqqppdpqqqppdpppppdddpwbkdLr0Jj{1/tttt/)[(|(|(|()))))|/l)uOQZOw0mmwwwYrw0Lbaaoooobo****##*#####MoMMMMMMMMMMMWWW&WW&W&&Wo&&&&&&&&&&&&
BBBBB%%BBB%%M%%%%%%%%MkZZa&%%%%88%BB@B%%88&WM#aaookpwqk#b*W*qb8BBM*M%B%&okmqkQQ####***********ooooooooooooooophaaaaaaaaaaaaakhaaaaaabhhhhhhhkkkkkhhOkkkhhhhkkhhhhhhk0juJJn(trrrnrxjjfjfffjf////|||((((((||(l(|UzQwwqwqqmqqwqppd00h0Q#k#MMWWWWWW&&&88*&888888888%%%%B8%%%%%%#%%%%BBB%%%BB
BBBBB%BB%B%B&%%%%%%%m8Mqk88%8*%BB@@BBB8khahkdwmOQLL0OZmcwOLao**Y*Wbo%BBBB%pM8XmCd##*********o*aaooooooaaaaaaapkaaaaahhhhhhhhbhhhhhhhdkkkkkkkbbbbbbb0bbbkkkkc(n(xrrfnnnnnxxxrrrrrrjjjjjjfftttttt/||0aao0|(||!||/0OwqqqwwppppppdmdbbbkQZ#MMMWWWMWW&&&8a&&8888888888%%%8%%%%%%M%%%%%%%%%%%%
BBBBB%BB%%%B8%%%%%%dM8&M8%8Zm&8BBBB%Mb*oadpwZOQUzzXXXYJLQ0Zwwcbv*#W&8%BBBBBB&&*UQp******ooooooaaoooooaaaaaaaapkhhhhhhkhhhhhhdkkkkkkkdbbbbkbbdqwpd0[tCYJJCJzufvtxunjcuunnnxxxxxrrrrxuuujvbh#Mo*wLmcZmwO0t|jr!//|(wmpppdddwppdddddbbqqbvo#MMWWWMWW&&&8k&&&8888888888%88%%%%%%&%%%%%%%%%%%%
BBBBB%%%%%%%8%%%%%hWBoM8%8a&88%*M&MW#*ohkdcccJU/vccczzXY/JJLOwdkahhM&8%#B#o%BoBoZZpoooooooooaahhaaaaaahhhaahhqbkkkkkkbbkkkbbpdbddbddYOqqCuQ000QLJUJUYYYYXYzzXcuuvuxuuuxuYLQCY0Cb#obCrwvbZwdUpa#obhh*%8bj///>t//rvqZddddbbbbbbbbbbbpbkkc#MMMWWMWWW&&&kW&&&888&&8888%888%%%%%&%%%%%%%%%%%%
BBBBB%%%%%%%%%%%%%BmmO%%%88888BBBWMhabhpwY0Uzbw&BBBBBBWpdrJYnLmpbhpq&#BBBBBBB%aBWpZQooooooooaahhaaaaaahhhhhhhqdkkkkbbbbbbbbbpddddddmUZOOOOO0000QuYJJCCzvXYXzzcvvvZmUCZhhpJUObbqUZJpoMMo8%%%%%%%%%%%%%%brttt>tttt/cqdddbbdbbbppbqkkkkkkkQMMMWWMWWW&&&b&&&8888&8888%%888%%%%%8%%%%%%%%%%%%
BBBBB%%B%%%%%%%%%a##dCw88#&88BBBBM#*ohwZCC#W@@@@@@@@@@@@@%pUCLnwwdkhWBB%8BBBBB%WB&hpdoooaoooaahhhhhhhhhkkhkkkwdkkkbbbdbbbbbbqdddddmmQOOOUCO0000QQLLLLCJUUYYXXzzccpaQawq*M&&W&%%%%%o#%%%%%%%%%%%%%%%ob&bxjfj>frujttLOdbbbbbbbbbbkqkkkkkhhbMMMMMWWW&&&bW&&88888888%%%&88%%%%%8%%%%%%%%%%%%
%%%%B%%%%%%%88%%%o#%%a8%%8888kw#ObhahQzmvWB@@B#aahhhaao%@@@BZCQnwpbka%BBod8%BBBo0*nbpooaaaaaaakkhhhhhhkkkkkkkwdbbbddpwwwZ0LLUC0OJYmmQOOOOOOLOQ0QQCxLLCJJUUYUYXXzcmJO%%%%%%%8888888h*%%MZXbqdhz()[-1{1tfxjrr+jjffffrpmbbbbbkbkkkkkhhkkkhhho*MMMWWWW&&b&&&88888888%%%&8%%%%%B%%%%%%%%%%%%%
%BBBB%%%%%%%%%%%%#WM%b&%ba88@@@@0dahbCXvoB@@%ohhhhhaaaahW@@@BUvLJmpd0bB%W#%%BBBWMBLdmaaaaaaaaahhaahhhhhkkkdOCYCOQzJCJnft-[}}]??-+~~<~zuYOZOOOOCJCY00JYCCJJUUUUYXxZpQ%%%88&#wL0OOOn}?-<1?-{](|/runt(<kCwxxxn_rrrrrrrvQQbkwkkkkkhhhhhhdbhhhadh#MMWWWW&bW&&&888&&88888W88%%%%%%%%%%%%%%%%%%
%%BBB%%%%%%%%%%%%a*%B&%8kkM8BB@@0QhkdwqX*@@@&hhhhhhhhhhaa@@@@nLL(Zqpb%%%&&BBBBB8&BYppaahaaaaaakkhhkkkkkZZ(r1{[{x||cfnffLr|}((1){}[]11v/t+1(OOzLOOJOO0QLCCYzYJUvnYwdQ&M##pqOXUCU|JJf]rUil]/fcQ/r}}|n<>>((juu?nurtfxnnJ0Zkkkkkkkhhhhhhhhaakaa0hMMMWWWWbW&&&&88&&88888W8888%%%%%%%%%%%8%%%%
%%BBB%%%%%%%%%%%%a*8B&%%bh8%B@@@0phkdwwJ#B@BWkhhhhhhhhhha@@@@XQOtmqpd%%%88BBBBBBB%Udbhhhaaaaahkkkkkkkbft/tXc)n(wz[rnr)_[Y((}l:,,,,i1ll|u]]f]}](LOZZOO0QCCLLCJJJUUCk0kf}x/hC}~<?Ln/JOcYUv-1+/<~}+]{xnjrzcvvc?uuuuuuuuuQzmkkhkpbhhhhhhhaaaahhaY*MMMWWWbWW&&&88&&88888M8888%%%%8%%%%%%8%%%%
88%%%88888888888&koW8&%%bh88B@@@OpkkdqqLMBBBWkkkkkkkkkkkhBBBBU00rwqdd%BBBBBBBBBBBBXbhhhhaaaahhkkbhaq10xturZj]]}uvr(?]-_++|z)(~,,,:]{;:,![X|;""!)[}LZOO000QQLLCCJJYhntZ#MfrLhoknt1}/f__zC{jz]<i~<?}uUnXYzczc[vvvvvvvvvvmOkhhhhhhhhhaddaahhaoohxMMMMMWbMWWW&&&W&&&&&&#&&&8888&&&&8&&&&8888
%%%BB%%%%%%%B8888ko#*&%%ka88B@BBZqkbdqqQMBBBMbbbbbbbbbbbkBBBBCQ0umqpd%BBBBBBBBBBBBYbhhahhhhhhhkUkUokUkdU-}}}[tzrj[]??-_++~~nzrvl,_/!:,"":/n(l,"  ;~ZZZZOOO00QCzcXYhcuCvCqxnuQpLJ00ZX0muU+[)}/ujxnrnCJQOzzcn{nczczzuf/rcdCYqaabZbaaaaaaaaooobhoO#MWWWbWW&&&88&&88888M8888%%%%8%%%%%%8%%%%
%%%BB%%%%%%%%8888hadbq%%bOZmqqqqJqbdpwmL#B%%MdddddddddddkBBBBLQQcmwqp%BBBBBBBBBBBBJdkhhhhhhhkphdkMLxuYZovhn}UQzXx(?<!i~++~~<_X0vx)-;,,"""";()|l,"":}|ZCJQZZ0QQQLLYhcXzCOmokddddkZXU0OYmQxv)YLLUxqobqOdpzXXz/zzzzXzzzXXXUbkhhhhhaaahqbaaoLOaoo**a#WWWbWW&&&88&&88888M8888%%%%%%%%%%%8%%%%
%%%B%8%%%%%%%88%8*MbmO%%o*88@@@@Qwbdpww0M%%%#qppppppppppbBBBBQ00cmwqq%BBBBBBBBB8W%Jbkhhhhhhoubp#Lxrrrtzbopkbakkhaoo**#*dJj(1)/xcx([[+<,"""""!J}<:,,:[cXOOOOOO000QJhO&LkMQwadbbbpwpOkWWWhXMW&8%BBB%BBBBaYYYY(XXXXYYYYYYXXUtbhhaaaaaahhooaoooooakhaMWWdWWW&&88&&88888M8888%%%%888%%%%8%%%%
%%%%%8%%%%%%%%%88W&dJJ%%*#88@@@@mqbdddqC*%8%#wwwwwwwmmwwpBBBBLO0cwqpp%BBBBBBBBBB%BUdbhhhk#ph0*ZvdaMMo*ovxoawX1j|t|([-_]|zZbkkkk*Onrj)ttjjf(][_xC1i;;:ltQOZZZZZZOO0hZ%%%BBBBBBBBB%%koBBBoCBBBBBB%%%%%%%aUUUU)YYYYXYUUUYJYY|daoaooohddmZZh*mzwkbooao#WbWW&&&&8&&88888W8888%%%%88%%%%%8%%%%
%%%%B8%%%%%%%%888&8dXC%%#M88B@@@0wkbbbdLo&&8*ZZZZZZZZZZmw%%%%LZZYqpdd%BBBB%%B%B%8BJdbkw0omO*hOwdufXXXXzczhkCX(ttt////|)1{{}[][{o0Jxr[}xUv1{vaJ/()|)t(_+-zZZZZZmZZwkmB%%%%%%%&MW&88ko%%WpXwO0ZmOZmZQcf|xUUUU)UUUUUUvzYUUUY(waooooobodmmm8%BBBB*bo*#aMkWWW&&88&&8888%W8888%%%%88%%%%%8%%%%
%BBBB&%%%%%%%%%88%%bYq%%#M88BBBB0qkkkkdJaWW&aQ000000000Om%%%%CmmJpddb%BBBBBBBBB%8B0dwxQhQZhh?czzYXXYzxvXzpa0Y/{/)f/{}(|{}[][}-MdLr/tr?]]?_++_-}r{)O0bJcz[1mmm0YUCQpZ%%8MMMbYXYuf((/))|nUJYXu-xzcUZpha*dUJLL)UJJUUJJUvzJUU|Jqoooaoooapww%&oBBBB#o*hokbWW&&&888888888W888%%%%%88%%%%%8%%%%
%BBBB&%%%%%%B%%%%%8aC#%%MM88BBBBQqhhkkpUhWMWhCLLLLLLLLLL0888%UmwQpdbk%BBBBBBBBB&WBQpj*muJaMit?cXJCCJJJJXud#pU+|jftt/})|()1111aoUc-{z}{-??]?_--}JvfpwOLJJX|tmmmmwqZbZ%88&*mabah#MMMh(-*&B%8Znj){wMW&&&WkJCCC)JJJJJJJCJUnYJfUz0***ooa*bqq8%**BBBBM**##dWW&&&88&&88888W888%%%%888%%%%%8%%%%
%%%BB&%%%%%%%8%%88%*m8%%WW88BBBBOphhkbpYk##MkJJJJCCCCCCCQW&&&YqpmZXcYa&8%%%%%%%WMBZmq_LQb#?zzt|LLLLQQQQCLaMbY|f/t//({))_1{{}CM]X[[-_w1)???]]-?1jcpdpvcccYY?rmmmmw0hm%%8W8W*#oZ]:>jpwf{h*WMLvzvt]]f/mftXCCCL(CCCCCCCCCCCCjxrCcm***khobpp%%Wb*%BBBWa#MbbM&&&&8&&88888W888%%%%%8888%%%88%%%
%%%BBW%%%%%%%%%%%8%8hB%%8&88B@@BZdhhkbpXd**#bYYYYYYYYYUUCMWWWnmwpdbkh%BB%8%BBBBM*Bmp>]LcwZzYYvfXQQ000Q0JQ*MdY([|1)()()){}}[thCLx}]}[?Qx1?-]}}]vXcbkknczzUwX[CmmmXCawBv+>iC&Q{{]j/j|]/|/f1nwzzJr|1)|x[nzLLQQ(LLLLLLLLLL0QLuLCZqa**oh*kdd8%W*aMBBBBhkMMMdW&&&8&&88888&888%%%%%888%%%%88%%%
%%BBBW%%%%%%%%%%%%8%8%%%%888B@@@mdahhbqYpaaopczzzcccccczY##MMxZwqpbkh%%%&WBBBBB#a%O{XvzL#jXUUYtnLQ00QLQYQ#MpY1|(((()1[]?]??0dZw{}[]]?{0r(??}}]/Xmho0qjcz0pY[nwmmmYoqBX{[~I!-tUr(ft|{|rLrj()rct{[[?(|[/UQQQ0(QQ0OQQQQQQQQQvLLLbOo**ahkdb8%M##k%BBB%boMW#a&&&8W&88888&8888%%%%88%%%%%8%%%%
oaaahahahhhhhhhhhha&%%&M%%88BB%8mphaadOOxpkhmxxnnnnxxnnucaoo*pqupqdbh8%#qOb8BBBobZYufLh#)nJJJCU-uCLCJULcLMWpC|(()|t(11{{{}JWda})1[[}}}jqv))1(cCjmaobCqcvwkXv)Umm|[_{fJ#&Mx/(1frni]XUC0Uuvvjnc-_(/frzzXC000O)Q000000000000cQQQQh###*haoh8%WWW8BBBBBUbWWWMoaaahkkkkhhhhhhaaaaaaaaaaaoooooo
%%%BBW%%%%%%%8%%%%%&dJQ%%hM88@@@%#oooakmZ0OZJ//ttffttffjxwpbqOvpdbha#%%%&W%BBBB*QqcQl0Wcn0LLQ0QCiUU0QOcvwWMqUUL|/vxt|xzv(YWZpx/{//r1}1}xwc((?/wQwaohwXQumknv-[UmmOqqbYvzjcXrffrO0ZLXYvYcucYX0rtXQZqLCkdOOZZ)00O0OOOOOOOOOX00000h####kdb8B&W&%BBBBBCh8WWW&#W&M&&8888&888%%%%%88%8%%%88%%%
%%%BBM8%%%%%%%8%%%%%MWk#%%*&8B@@@d*#*oahUQLwJj)))((((((/jQzULwqdka*M8%%&aBBBBB&dqnUZ<QdLm0QL00LQntUOO0JCO&WpZQYjCXXctxLJJqwqcYftvvn1(cxtXpx|fw/LpaohkZQYC*|u(}zmwOdp@B&BwOJrzL#habJvQkqoomCLooXj0#qZ&8*mmqm)OOOOOZZZZZZZZYOOOOOwXok#Ma&&8BBBBBBBBBLh&&&#W8bW#&&88888888%%%%888%%%%%888%%
%%BBBM8%%%%%B8%%%%%%MbW*#%%M&8%@@@8Zdoa*oahZOLQUO0000OwpYZqqdbpakh*&%%8*BBBBBq8MvcZmz#mYZOQQ0OwZO+0LQ000ZM&hmXYvCcXvczJYmhpmXcxnzzv1uzvv/zmu)bpOpaohbqwLnd]//}jOw0qLBBBBBBhYa%BBBBOv#BBBBBBBBB#ZBBBBBBMwwww(ZZZZZZZmmmmmZYmmmmZmbJMMMk%BBBBBB%BBBBYk&888&#&qo&&888888888%%%88888%%%888%%
%%BBBM%%%%%%%8%88888M&b8hO*&#bb8@%B@B%dbMOMM##qkoaaaaa0*MM#Zw*Mw%8%8WdOM%BBBbBWvt0mx%kfOmOU0Jwkdhh:QJYmZO#%WL1{1}{)1}[](WM#U|1[]???-}|/rv)Udp)Zmdaohbwwkfn)/|}--mZqQ%BB8W*kqOLJJCzvjrjj/fffjjfftjrxuvXQqppp|mmmZZwOOOOOOOYOZZZmqZuMW#h%BBBBBB%%BBBUk#o#8888&a&8888888888%%%88%%%%%%88%%%
%%%BBM8%%%%%%8888888M888%&8pW%%h*&%BBBbh&&W&&bkMMMMWWWWL&&WMW8oMdM%BBBBB%8w#BoxZp8BwbqwQzrffjnXLOqboM&%%BW%8BB%%%888%%88oL&&&&&WWMMM##ohdZCz{n(}}|uCmpdkk}dnn|}]mOqCWBBBBBBBBBBBBB%%BBBBBBBBBBBBBBBBBBMqqqq(mwwwmmwwwwwwwLwwwwwwmcWWW#%BBBBB@%%%BBYh%%%%%%%%%&&888888888%%%888%%%%%888%%
%%%BBM8%%%%%%8888888M8888Wa%Z&oM8%oMpBBB%8M*obkkkhhao#MWb888%%%BB8*hM%b8%MWChOo%#ad###kkkkkhkkbpwa&hCJUzu#%&Zt/tffjjjjxuh*bu{11(jxrjtt/jjfCYkjkha***oaohow8OmpkkUQdQWB%%%%Whkdddbbmwdbpbppddqdpbdppdppppppp|pwwwwwwwqqqqq0wwqqqqwzWWW&BBBBBB@8%%%%Yh%%%%%%%%%&&888888888%%%8888%%%%8888%
%%BBBM8%%%%%%8888888#888888%oWkMamModmmqbo#h8%%8888888888%WM%%%%%%%MkQMkQha#M#oZvCrhmC-nnuuxxxnxjkW/nnnuu#%&OttfjrnjfffjcW#acjtrLmZOvnnnuJJ*YhwmwhakkqqZ{Q&uXXXXbJdZWMMM*hkZnxzUXJYvJCZQZmZmwQmmZmZOZOwppdp/qqqqqqqppppppQqqppppwXWWW8%88&&8&%BBB%Ja%%%%%%%%%&&&88888888%%%88888%%%8888%
%%%%%M8%%%%%%8888888#888&&&8&&&&&B@@@@BB%%%%8888888888#%BB%%mJJJCCUUkoa****#*#p_{Jfkv*Ofttftttffd%]jjrrxxM%8OttffrcxffjjjJW&ortxLwZZnxnvrwMqqhOmqhabkpJUamuqXztjbYbm8%%%888%8%WC&#q0*WkMMWMpkm&&888888#ddddt0nxnnrjt|(/fnxvJppddqXW&&MW&#aBBBBBBBBCo%%BBBBBBB&&88888&888888&88888%%888%8
%%%BBW8%%%%%%888888%#888888%88888B@@@@@@@@@@B%%%%%8%%%&B@@@@o8@B%###MM####MMMMbvJXvQr)n_|||/f||L&ptfjrjjj*%%O/ttttffjjffjjOMWXfxCZ0OvcurLW*UwYaqqhabhdhvzO(#zzf_pJkYr[}}jL#WdW%d%%*wM%%ocvxrjb(vzzw*W%MdbbbfJtt|){}]-_]{(|rYpdddqX&&&&BBWdBBBBBBBBLoBBBBBBBBB&&88888&88888%&8%%%%%%88%%%
%BBBBW8%%%%%%88888%%#888888888888o8%8B%8WMW*bMW%%&dBB%8wLYnffXwko#MW&8%M##MMMMMa(/Ztrzoz}11)|)fOWt||tf//t*%80/////tfjjfjjrrpmWunQpqwvunJwdLYmdkmphhbh0fZO0m#czUw0[jpBBkUOwkm#&WZ*%o#Mb%oXXXYQMp##YvXcaMbbbkrz)1}-_>~>ii+[1tzpddkpY&88&BBWdBB@BBBBBLoBBBBBBBBB&888888&888888&8%%%%%%88%8%
MMMMM*#######*****##a**oo***oooh#88a#WM##aWbW%###*q#*w#k*W&ahW&p**#o#*ophkhhaahX[cb<nuJU1}}{{1XMf))(|||t|*%%O|||t//trmbddddC*OWObkkbfvXwpQXXCmQokahkakdLC0pkqzUCO)oUcJ#Wh&*ammZoJCuuXjjvJJcvccYXzJucz0mbbbbnv1}[?~i!llll__{cdddbpU&88&BBWdBB@BBBBBQ*BBBBBBBB8o****##**#####*#M#MMMMMMMMW
%%B%B&%%%%%%%8888888#8888888888#&@*888888#8&MW#&%8bBBa#888&W%qM%BBBB&BB%WMMMWW#0Y1L{%&0C1?}}1cWYxuX11)((|W%80(|((|//rwkdkbpCvWUWbkbktvQZwYUUJqhakaahhncZQdpvou(mh|aLL0QLQOQm#MZCLOXXOU[vJOk*oMohLUzvpY0bbkbcn[+<~~<ilII!~-{vddddpU888&B@WpB@@B@@@@L*BBBBBBM%%&&&8888&888888M88%8%%%8%%%%
%BBBB&%%%%%BB%%%8%%%M%%88%%%888*WB%888888M8%ok#&8&qBB*d8%8MBB&&&%%BBh%BB8MMWWWMaO{0x#Mohaf{J)z*LJJUrdddpq8%&b0JzXzf|fuXYUCOwp*8*WhhbvfoapZLQQmLQ*obhqpdZw*qQou[motaQqhqqppkLJYUL00Ut((pWbZOZm0L0QLawLJOkkkbzx---+>!ll;I!~]}xbbkkpX888WB@WdB@@B@@@@LoBBBBW8BB%W&&&888&8888%8M888%%%%8%%%%
%%%%%&8888%%%8888888M&&&8888&&&*W@W&&&&&&W&&##W&8&mB%&d&8&M&&#**#&&8b&%B8MWWWWMMvnbcvjjfZ[/cuWLzZkqwwwwppW%&*mwLzzzYCQZZmZhhkk*Wkwwmr*ohhhm0Odkoqbh*muZkhobhhcCha/ad8&W#**M*b*&&b%OCkLo##oa&88Wobk*#*hhhkkkYr]-~__~<>!i<_]}xhhkkdz8%%MB@&h@@@B@@@@LoBB88BBBBB&&&&888&&88888o8888%%8&8%%%
&&&&&WWWWWWWWMMMMMMMMMMMMMMo###h#&o######M#Mo*#&8&m888bW&W#o#&&88%BBa%BB&aaoooo#WwkcLCUuma]r&puCwdq0OZwww&%&ZrpzuccvUqZqmbpqbbw&#oqL#Z#dppwQQOw0poazv*oo*#*wCwwaa/adBBBBBBBBBBBBBBOu#%&BB%B@@@B%8&M***okkkkUx}[+-?-_~>~_?})Ykkkkpc%%%#B@&k@@@@@@@@LoB%BBB@B@B##MMMMM##MMMMMbMMMMMMMMMWWW
%%BBB%%%%%%%#&8888888888888d&&&*WBM&&&&&&W&&***&%8m&&8hW&8%&&8&88%BBa%%%8WWWWWW&%nwY0OOOU*pC*ZnuvcUOOCQLQ8%&mnpzuvzJq*h0wQ0maoaOWMCdxMqwwqqqqqdk*whMho*##MMpLOZaajakkbbbbpZbbbbkhahkq0YXvvvvccXYC0wk#8WkkkkJc(]]}}}[-+[}?jnQkkkkdv%%%M@@Wb@@@@@@@@L*BBBB@@@@BW&&8888&&88888h8888888&8%%%
BBBBB%%%%%%%k&888888&888888d&&#*M8&%%%88&&&W&&k#WMZMW88888%B%8&*dOQUvrjxuzQd*MMW8ZwM8%ajnCp%ajjjfjjXCJJCL%%8pzpCUJJCCCdO0Q0Up00CLpbw#YhaohbpqqppJhM{ooaqqo#*#YLaajaaaaaahhhahaaaaahhhhdhhhhhhhhhhhhhhhhkkhkC0YzzzccvvccYUCCZkhkkdn%%%M%%Mp@@@@@@@@Q*BBB@@@@@B&&88888M888888W88888%8W%%%%
%%%%%%%%%%%%h&888888&888888M&8Bo**oaahhkbbdqwwwpbaaakdqwqpaoodaaah*odZZpa*W8B0WZmaapM88pq#B%&#hbbbaM8%888%%8ah#MWWWMkM8%888&&&WWW&wawM#MMM#okpwZZZUa#*aL|YpqwnYO0tQOwdkkdmQXzJZda**ooohpwmwdkhhhkkhhhhhkkkhJhhhhhhhhhhhhhhkhahkkdnBBBM&p#w@@@@@@B%Ua%BBBBBB%&&&8888&h&8888%8888888&*8%%%
%BB%*&%%%%%8&&&&&88kW&&&&8&&&8BBBp8%%%%d#88&M88&O8&&ko8%8p0hBZ8B&a8&qJZ*8%%&owBB8%B%W#adddpppdqmO0Ompkohw0YLLQOZmwwqqppdbkaoooo*hdmLJOCUXXYUQOZmwpbopkhh#%%%%%%%%v%%%%BBB%%B%#kpdh*MMoCpmLXcXCmkahwLzvz0b**qo*abOJULwkha*khhkkkkdx%%%&8&M#*oooakbbwa#&%%BBB@&W&&8888#&888888888888&#8%%%
%B%%%%%%%%%*W888888&&88&88kW&8BBBd&88%%m#&*W#M*oZ%8&ah*MWJcp8%%hLdBMmJa%BBBBBBB%%%%8WWBB@@@@@@@@@@@@@BBBB%wBBBBBBBBBBBBB%%%%%%%Wk8888888888%88888888h%%%%%%%%%%%Bu%%%B%BBBBBBBBBBBBBBBmBBBBBBBBBBBBB%&WMW&8q%%8*wztfc0doWMqXjtuLmfba*8%8WMM&8%%8&&hcjZWBBqMBWp8888888&88%%8Wo8%%%%%%8%%%
BBBMW%%%%%%%%%%%%%oW8888888888BBBd8%%%%%B@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@BBBBBBBBBBBBB%B@@@@@@@@@@@B@@@BB8LBBBBBBBBBBBB%%B%&obpZm888888888&88Mk8888&q%%%%%%%%BBBBu%BBBBBBBBBBBBBBBBBBBOBBBBB%%BBBBBBBBBBBBBwBBBBBBBBBBBBBBBBBBBB&cBB8BBBBBB*8BBBBBBBBB&M&mMB&#*M8%%%Wa8%%%%%88%%%%%&M%%%
BBBBBBBBBB&8B%BB%%%%%%%%%%%%%%BBBw%@@@@@B@@@@@@@@@@@@@@@@@@@@B&*kqwpk#&BB8%B%888888888BB@@@@@@@@@@@@BBB@@8CBBBBBBBBBBBB%W%%%%%%Mb888888888q&8aJ8888&w%%%%%%%%%%BBuaM%BBBBBBBBBBBBBBBBBOBBBBBBBBBBBBBBBBBBBBqBBBBBBBBBBBBBBBBBBBB&cBBW&M#*hdm*%%&wY0w*%8M0cp%BBBB%%%%%%8%%%%%&W%%%%%B%%BB
@@@@@@B@@@@@@B@BBBBBBBBBBBBBBB@BB00Q0qo&%BBBBB%&#hbbkoW&%%%%88%BBB%88&8888&MMB%%88&&&88%@@@@@@@@@@@@@BBB@8XBBBBBBBBBBBB8Q%BB%%%Wb888888888UW8oL8888&d%%8kQmoM&*b*a&#*WW*bppqb#&88#pQQd0BB%BBBBBBBBBBBBBBBBBdBBBBBBBBBBBBBBBBBBBB8cBB%oBBBBBBB%%hYB@BBB%%%%%%%&QczvYwo&BB%BBBBBBBBBBBBBBB
BB%BBBBBBBBBBBBB%8%%BBBBB%%BBBBBBB%8%%%%%%&%%%%%%%8%%%%%888%%%%%%888888888M&8OOwbkkhaoa0cUQmd*W%BBBBBBBBB&zBBBBBBBBBBBBBBBB%%%%Mp888%WopQYvUmkhoo*okQ#MWWWWWMMWMWWWWWWWWWWW&WW&W&&&&*W&&&&M*b#MW&&WmuvmWBBBoBBBBBBBBBBBBBBBBBBBB8zBB%aznxzwWBBBoUB@orc#WMakoocQ8%W&%@B8%%8&8888%%%BBBBBB
%%%%%%%%%%%%8%M88888888%%88%88W#WWW&&&&&&8&&&&&oW&&WWWWWWWWWWWWWWWWWWWWW**WWWWWWWM####MMM*MMMMMMM*********ooooooo*ahooooooahhhhhhhhQbkkkkkkkkbkkkkkdzaooaaaaaaaoo***kh*#####M*#MWWWWWdMWWWWWWWMWWWW&&M*&&&&&&&W&&&&wnJo%BBB%&M&%8z%WWhBBBBBBBBBBB8#wuXB@@@@@@@@@@@88@B%B%BBBBBBBBBBBBBBB
W&W8&&&&&MMM&&&&&MM#WWWWWW#WMWWWWWMoMMMMMMM#o#######oh*####**hp##***ookdaaoaooahaaaaaaahhhahhhhhhkkkkkhhkmkkkkkkkp0bbkkkkkddkkkkkkhkbkbbbbbbbbbbbbkbLbkkkkkkwOkkkkkkkqbhhhhhhakaoooo**h#MMWWMWMMMMWWWW&WWW&&88&#*&&&&&&&WW888888&8888h%BBBBBBBBBBBBBBB@@@@#dB%bm&&%&BBBBB8M%8BBBBBBB%BBB
8%%88M8M8888&&W&W&&&&&&WMWWWWWWWa#WMWMMMMoMMMMM#M###*######*o*****ookkoooaaaaOdaaaaaahqbhhaaaaapbhhhhkkkwkkkkkkkbmbbbbbbbmObbbbbkk0pbbbbbkkkbbbbbbkkdkkkkkkhkbkkkkkkhkbbkkkkkhkbbkkkkkkddkkkkkkdwdkhhhhhdwhhaaaaapqaaooooobkoo*****kaMMMWWoqQObM8%%%8&#dWBB%&%8%%%%%8&&8B%BBB88W%BBBBBB&
88W88888888#&&&&8&&8W&W&&&&&&MaWWWWWWWWWMMMMMMMMq##########*******hhaaaaaaaqkaaaaaaaoahaahhhapmhhhhhhhhbkkkkkkkkcbbbbbbbbbdbbbbbbbwdbbbbbkkLbbbbkkkkkkkkkkkkhppkkkkkkkQdkkkkkkkbkkkkkkkhpqkkkkkkkZdhhhhhhaahhaaaaaaaaaoooooopboo****oo*####MM##W&&&&&&W&&&&&&&&&aW888888%h%%%%%%%%%%%%%%
8888888&o88888&&&*#&&&&&&&&kWWWWWWWMM*MMMMMMMMM#######*d#*#####*kwooooooooaaaaaaooa0aaaaaaaabdahaaaaahhhhhhhkhhJkkkkkkkkbqbbkkkkkkbbkkkkkkkcbkkkkkkkkkkkkkkkhwqbkkkkkkkpkkkkkkkhkbkkkkkkhqpkkkhhhhabhhhhhaah0haaaaaaoaaaoooooomho******####MMMMMoaWW&WWWW&&W&&&&&88k8888888%88%%%%%%%M88
%%%&8W8%88888M8#88888&&W#M&&&&&&&&hWWWWWWWWohMMMMMMM#b*#######ad******oohaooooooohaaaaooooodaaaaaaaakbhhhhhhhhwkkkkkhhhkQkkkkhkhhOmkkkkkkkkLkkkkkkkkbdkkkkkkkkbbbkkkkkkbbbkkkkkkbqkkkkkkkkwdkkkkhhhhbkhhhaaaahhaaaaaaabdaaoooooowk******#oko##MMMMWWoWWWWW&&#&M&&&&88WM&8888%%%*88%%%%%%
                                              
      `];
    const [frameIndex, setFrameIndex] = useState(0);
    useEffect(() => {
      const interval = setInterval(() => {
        setFrameIndex(prevIndex => (prevIndex + 1) % asciiFrames.length);
      }, 300);
      return () => clearInterval(interval);
    }, []);
    return (
      <div className="fixed inset-0 bg-[#120825] z-50 flex items-center justify-center text-white">
        <div className="relative">
          <pre className="text-xs sm:text-sm md:text-base text-cyan-400 font-mono">
            {asciiFrames[frameIndex]}
          </pre>
          <div className="mt-8 text-center">
            <div className="inline-block h-2 w-2 rounded-full bg-orange-500 mr-1 animate-ping"></div>
            <div className="inline-block h-2 w-2 rounded-full bg-orange-500 mr-1 animate-ping animation-delay-200"></div>
            <div className="inline-block h-2 w-2 rounded-full bg-orange-500 animate-ping animation-delay-400"></div>
          </div>
        </div>
      </div>
    );
  };

  // ASCII data stream animation
  const AsciiStream = ({ top, left, delay, duration }: { top: string, left: string, delay: number, duration: number }) => {
    const characters = "10101010101010101010";
    const [streamChars, setStreamChars] = useState(characters);

    useEffect(() => {
      const interval = setInterval(() => {
        setStreamChars(prev => {
          const shifted = prev.substring(1) + prev.charAt(0);
          return shifted;
        });
      }, 150);
      
      return () => clearInterval(interval);
    }, []);

    return (
      <motion.div 
        className="fixed text-green-500/20 text-xs font-mono pointer-events-none"
        style={{ top, left }}
        initial={{ opacity: 0, y: -50 }}
        animate={{ 
          opacity: [0, 0.4, 0], 
          y: [0, 100],
        }}
        transition={{
          repeat: Infinity,
          duration,
          delay,
          ease: "linear"
        }}
      >
        {streamChars.split('').map((char, i) => (
          <motion.div 
            key={i}
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
          >
            {char}
          </motion.div>
        ))}
      </motion.div>
    );
  };
  
  return (
    <div className="fixed inset-0 min-h-screen w-full bg-gradient-to-b from-[#120825] to-[#1F0443] text-white overflow-hidden">
      {/* ASCII loading screen */}
      {isLoading && <AsciiLoadingScreen />}

      {/* ASCII data streams */}
      {!isLoading && (
        <>
          <AsciiStream top="10%" left="15%" delay={2} duration={8} />
          <AsciiStream top="20%" left="85%" delay={3.5} duration={10} />
          <AsciiStream top="50%" left="8%" delay={1} duration={12} />
          <AsciiStream top="70%" left="92%" delay={4} duration={9} />
          <AsciiStream top="35%" left="60%" delay={2.5} duration={11} />
        </>
      )}

      {/* Noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px'
        }}
      />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/80"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 5 + 1}px`,
              height: `${Math.random() * 5 + 1}px`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, Math.random() * 0.5 + 1, 1],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* 3D floating elements with enhanced shadows and lighting */}
      <div className="absolute inset-0 overflow-hidden opacity-30 pointer-events-none">
        {[...Array(10)].map((_, i) => {
          const isSquare = Math.random() > 0.5;
          const depth = Math.random() * 0.5 + 0.5; // Depth factor for parallax (0.5 to 1)
          return (
            <motion.div
              key={`shape-${i}`}
              className={`absolute ${isSquare ? 'rounded-md' : 'rounded-full'}`}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 50 + 10}px`,
                height: `${isSquare ? Math.random() * 50 + 10 : Math.random() * 50 + 10}px`,
                background:
                  i % 3 === 0
                    ? 'linear-gradient(135deg, rgba(0,230,255,0.2) 0%, rgba(0,153,255,0.1) 100%)'
                    : i % 3 === 1
                    ? 'linear-gradient(135deg, rgba(249,115,22,0.2) 0%, rgba(255,179,77,0.1) 100%)'
                    : 'linear-gradient(135deg, rgba(255,215,0,0.15) 0%, rgba(255,176,0,0.05) 100%)',
                backdropFilter: 'blur(5px)',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), 0 0 8px rgba(45,212,191,0.1)',
                transformStyle: 'preserve-3d',
                transform: `translateZ(${i * 10}px)`,
                zIndex: Math.round(depth * 10),
              }}
              animate={{
                y: [0, Math.random() * 40 - 20, 0],
                x: [0, Math.random() * 40 - 20, 0],
                rotate: [0, Math.random() * 20 - 10, 0],
                scale: [1, Math.random() * 0.3 + 0.9, 1],
              }}
              transition={{
                duration: Math.random() * 20 + 20,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              // Enhanced parallax effect based on mouse movement
              whileHover={{
                z: 30 * depth,
                transition: {
                  duration: 0.2,
                },
              }}
            />
          );
        })}
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 h-full flex flex-col relative z-10">
        <motion.header
          className="flex justify-between items-center py-4 sm:py-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ rotate: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-[#f97316]" />
            </motion.div>
            <h1 className="text-lg sm:text-xl font-bold">UniversalAI</h1>
          </div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={() => navigate("/home")}
              className="bg-gradient-to-r from-orange-500 to-amber-400 hover:from-orange-600 hover:to-amber-500 text-white px-3 sm:px-5 py-2 rounded-lg border border-orange-300/30 shadow-[0_0_15px_rgba(249,115,22,0.5)] transition-all hover:shadow-[0_0_25px_rgba(249,115,22,0.7)] text-xs sm:text-sm relative overflow-hidden group"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-orange-500/0 via-white/20 to-orange-500/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
              <Link2 className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
              Connect with Crossmint
            </Button>
          </motion.div>
        </motion.header>

        <main
          ref={containerRef}
          className="flex flex-col lg:flex-row items-center justify-between mt-8 sm:mt-12 lg:mt-20 gap-8 sm:gap-12 flex-grow"
        >
          <motion.div
            className="lg:w-1/2 text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
          >
            <motion.h1
              className="text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4 sm:mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={controls}
            >
              {/* Custom typing effect */}
              <span>{typedText}</span>
              <span className="inline-block w-1 h-[1em] bg-teal-400 ml-1 animate-blink"></span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-300"></span>
            </motion.h1>
            
            <motion.h2
              className="text-xl sm:text-2xl text-gray-300 mb-6 sm:mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={controls}
              transition={{ delay: 0.1 }}
            >
              Make Magic Real Again 
            </motion.h2>
            
            <motion.div
              className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-5 mb-8 shadow-[0_8px_30px_rgba(0,0,0,0.12)] relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={controls}
              transition={{ delay: 0.2 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-purple-500/10 opacity-30" />
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                  opacity: 0.05,
                  mixBlendMode: 'overlay',
                }}
              />
              <p className="text-base sm:text-lg text-gray-200 max-w-xl mx-auto lg:mx-0 relative z-10">
                FREE DRAKE FROM OPPRESSION!!! UNIVERSAL.AI IS FOR THE CREATOR, PERPETUAL CREATOR CRYPTO MACHINES, HYPERLIQUID CULTURE FUND
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={controls}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                onClick={() => navigate("/wzrd/studio")}
                className="text-sm sm:text-base bg-transparent hover:bg-white/10 border border-white/20 backdrop-blur-sm px-6 sm:px-8 py-5 sm:py-6 h-auto rounded-lg relative overflow-hidden group"
                variant="outline"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-teal-500/0 via-white/5 to-teal-500/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                <span className="relative z-10 flex items-center">
                  Explore Platform
                  <ExternalLink className="ml-2 h-4 w-4 opacity-70" />
                </span>
              </Button>
            </motion.div>
          </motion.div>
          
          <motion.div
            className="lg:w-1/2"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ perspective: 1000 }}
          >
            <div className="relative w-full max-w-lg mx-auto">
              {/* 3D tilting main card container with enhanced shadows */}
              <motion.div
                className="relative"
                style={{
                  rotateX,
                  rotateY,
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Glass card container with improved lighting effects */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 sm:p-6 border border-white/20 shadow-[0_20px_80px_-10px_rgba(45,212,191,0.3)] transform transition-all duration-200 relative overflow-hidden">
                  {/* Inner noise texture */}
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                      opacity: 0.05,
                      mixBlendMode: 'overlay',
                    }}
                  />
                  
                  {/* Enhanced lighting effect */}
                  <div className="absolute -top-20 -right-20 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl"></div>
                  <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"></div>
                  
                  {/* Platform mockup interface with improved 3D effect */}
                  <div
                    className="bg-[#1E1E2E]/70 backdrop-blur-md rounded-xl p-3 sm:p-4 mb-4 sm:mb-5 relative"
                    style={{
                      transformStyle: 'preserve-3d',
                    }}
                  >
                    {/* Inner noise texture */}
                    <div
                      className="absolute inset-0 opacity-[0.05] mix-blend-overlay rounded-xl"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                      }}
                    />

                    <div className="flex items-center gap-2 mb-3 sm:mb-4">
                      <div className="flex space-x-1.5">
                        <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-400"></div>
                        <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-400"></div>
                        <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-400"></div>
                      </div>
                      <div className="text-xs text-white/70 bg-black/30 rounded-md px-2 py-0.5 flex-grow text-center">
                        UniversalAI Platform
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 sm:gap-3">
                      {/* Each tool card has enhanced 3D effect */}
                      <motion.div
                        className="bg-teal-500/20 backdrop-blur-md rounded-lg p-2 sm:p-3 flex items-center relative z-10 overflow-hidden group"
                        whileHover={{
                          scale: 1.03,
                          y: -2,
                          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1), 0 0 10px rgba(45,212,191,0.3)",
                        }}
                        style={{
                          transformStyle: "preserve-3d",
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-teal-400/0 via-teal-400/10 to-teal-400/0 opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-full transition-all duration-700" />
                        <Palette
                          className="h-4 w-4 sm:h-5 sm:w-5 text-teal-400 mr-1.5 sm:mr-2 relative"
                          style={{
                            transform: "translateZ(20px)",
                          }}
                        />
                        <span className="text-xs sm:text-sm">Design</span>
                      </motion.div>
                      <motion.div
                        className="bg-purple-500/20 backdrop-blur-md rounded-lg p-2 sm:p-3 flex items-center relative z-10 overflow-hidden group"
                        whileHover={{
                          scale: 1.03,
                          y: -2,
                          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1), 0 0 10px rgba(139,92,246,0.3)",
                        }}
                        style={{
                          transformStyle: "preserve-3d",
                        }}
                      >
                        <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-purple-400 mr-1.5 sm:mr-2 relative" style={{
                          transform: "translateZ(20px)"
                        }} />
                        <span className="text-xs sm:text-sm">Library</span>
                      </motion.div>
                      <motion.div
                        className="bg-blue-500/20 backdrop-blur-md rounded-lg p-2 sm:p-3 flex items-center relative z-10 overflow-hidden group"
                        whileHover={{
                          scale: 1.03,
                          y: -2,
                          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1), 0 0 10px rgba(59,130,246,0.3)",
                        }}
                        style={{
                          transformStyle: "preserve-3d",
                        }}
                      >
                        <Brain className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400 mr-1.5 sm:mr-2 relative" style={{
                          transform: "translateZ(20px)"
                        }} />
                        <span className="text-xs sm:text-sm">Research</span>
                      </motion.div>
                      <motion.div
                        className="bg-green-500/20 backdrop-blur-md rounded-lg p-2 sm:p-3 flex items-center relative z-10 overflow-hidden group"
                        whileHover={{
                          scale: 1.03,
                          y: -2,
                          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1), 0 0 10px rgba(34,197,94,0.3)",
                        }}
                        style={{
                          transformStyle: "preserve-3d",
                        }}
                      >
                        <Headphones className="h-4 w-4 sm:h-5 sm:w-5 text-green-400 mr-1.5 sm:mr-2 relative" style={{
                          transform: "translateZ(20px)"
                        }} />
                        <span className="text-xs sm:text-sm">Audio</span>
                      </motion.div>
                    </div>
                  </div>
                  
                  <div className="flex items-end justify-between">
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold">Creative Suite</h3>
                      <p className="text-xs sm:text-sm text-white/70">Powered by AI</p>
                    </div>
                    <motion.div
                      animate={{
                        rotate: [0, 10, 0],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-300" />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
              
              {/* Enhanced decorative elements with better lighting */}
              <div className="absolute -top-4 -right-4 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-600 to-pink-500 rounded-full blur-2xl opacity-30 animate-pulse"></div>
              <div className="absolute -bottom-6 -left-6 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-tr from-blue-600 to-teal-400 rounded-full blur-3xl opacity-20"></div>
            </div>
          </motion.div>
        </main>

        <motion.div
          className="mt-12 sm:mt-16 lg:mt-24 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8">
            Unlock a World of Creative Possibilities
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
            {[
              {
                title: "Visual Design",
                description: "Create stunning visuals with AI-powered design tools",
                icon: Palette,
                color: "from-purple-500/20 to-pink-500/20",
              },
              {
                title: "Audio Engineering",
                description: "Craft immersive soundscapes with intelligent audio tools",
                icon: Headphones,
                color: "from-blue-500/20 to-cyan-500/20",
              },
              {
                title: "Interactive Experiences",
                description: "Build engaging interactive content with no-code wizardry",
                icon: Sparkles,
                color: "from-amber-500/20 to-yellow-500/20",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className={`bg-gradient-to-br ${feature.color} backdrop-blur-sm p-4 sm:p-6 rounded-xl border border-white/10 relative overflow-hidden group`}
                whileHover={{
                  y: -5,
                  scale: 1.02,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
                }}
                transition={{ duration: 0.2 }}
              >
                {/* Noise texture */}
                <div
                  className="absolute inset-0 opacity-[0.05] mix-blend-overlay"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                  }}
                />
                
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-full transition-all duration-700" />
                
                <feature.icon className="h-8 w-8 sm:h-10 sm:w-10 text-white/80 mb-3" />
                <h3 className="text-lg sm:text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm sm:text-base text-white/70">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Landing;
