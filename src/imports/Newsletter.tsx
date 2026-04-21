import svgPaths from "./svg-dw7f0t6e7k";

function Container3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-white tracking-[1.2px] uppercase w-auto whitespace-nowrap">
        <p className="leading-[16px] whitespace-nowrap">NTH DEGREE</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#9ca3af] text-[12px] w-auto whitespace-nowrap">
        <p className="leading-[16px] whitespace-nowrap">×</p>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-white tracking-[1.2px] uppercase w-auto whitespace-nowrap">
        <p className="leading-[16px] whitespace-nowrap">SAKSOFT</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0" data-name="Container">
      <Container3 />
      <Container4 />
      <Container5 />
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#d1d5db] text-[10px] tracking-[3px] uppercase w-full">
        <p className="leading-[15px]">DEVELOPMENT NEWSLETTER . VOL 01 . EDITION 01</p>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col h-[83px] items-start justify-between min-h-px min-w-px relative">
      <Container2 />
      <Container6 />
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Black',sans-serif] font-black h-[32px] justify-center leading-[0] not-italic relative shrink-0 text-[24px] text-right text-white w-auto whitespace-nowrap">
        <p className="leading-[32px] whitespace-nowrap">07 Feb 2026</p>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col items-end pb-[4px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#9ca3af] text-[10px] text-right tracking-[2px] uppercase w-auto whitespace-nowrap">
        <p className="leading-[15px] whitespace-nowrap">VOL 01 . EDITION 01</p>
      </div>
    </div>
  );
}

function Border() {
  return (
    <div className="content-stretch flex items-start justify-end px-[13px] py-[5px] relative rounded-[4px] shrink-0" data-name="Border">
      <div aria-hidden="true" className="absolute border border-[#4b5563] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[9px] text-right text-white tracking-[0.9px] w-auto whitespace-nowrap">
        <p className="leading-[13.5px] whitespace-nowrap">CONFIDENTIAL</p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-end relative shrink-0" data-name="Container">
      <Container8 />
      <Container9 />
      <Border />
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Frame />
      <Container7 />
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 1">
      <div className="flex flex-col font-['Inter:Black',sans-serif] font-black justify-center leading-[0] not-italic relative shrink-0 text-[0px] text-white uppercase w-full">
        <p className="font-['Impact:Regular',sans-serif] leading-[64px] mb-0 text-[64px]">FEBRUARY</p>
        <p className="font-['Impact:Regular',sans-serif] leading-[64px] text-[#f05a29] text-[64px]">2026</p>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[8px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#d1d5db] text-[12px] tracking-[0.3px] w-full">
        <p className="leading-[16px]">Technology · Product · Transformation — Edition 01</p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading />
      <Container11 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Container1 />
      <Container10 />
    </div>
  );
}

function Link() {
  return (
    <div className="relative self-stretch shrink-0" data-name="Link">
      <div aria-hidden="true" className="absolute border-[#f05a29] border-b-2 border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col h-full items-start pb-[6px] relative">
        <div className="flex flex-col font-['Inter:Black',sans-serif] font-black h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-white tracking-[1.2px] uppercase w-auto whitespace-nowrap">
          <p className="leading-[16px] whitespace-nowrap">CONSULTING</p>
        </div>
      </div>
    </div>
  );
}

function Link1() {
  return (
    <div className="relative self-stretch shrink-0" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col h-full items-start relative">
        <div className="flex flex-col font-['Inter:Black',sans-serif] font-black h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#9ca3af] text-[12px] tracking-[1.2px] uppercase w-auto whitespace-nowrap">
          <p className="leading-[16px] whitespace-nowrap">DEVELOPMENT</p>
        </div>
      </div>
    </div>
  );
}

function Link2() {
  return (
    <div className="relative self-stretch shrink-0" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col h-full items-start relative">
        <div className="flex flex-col font-['Inter:Black',sans-serif] font-black h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#9ca3af] text-[12px] tracking-[1.2px] uppercase w-auto whitespace-nowrap">
          <p className="leading-[16px] whitespace-nowrap">TRANSFORMATION</p>
        </div>
      </div>
    </div>
  );
}

function Nav() {
  return (
    <div className="content-stretch flex gap-[48px] h-[47px] items-start pt-[25px] relative shrink-0 w-full" data-name="Nav">
      <div aria-hidden="true" className="absolute border-[#374151] border-solid border-t inset-0 pointer-events-none" />
      <Link />
      <Link1 />
      <Link2 />
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start max-w-[1280px] relative shrink-0 w-full" data-name="Container">
      <Frame1 />
      <Nav />
    </div>
  );
}

function MainHeader() {
  return (
    <div className="bg-[#041627] relative shrink-0 w-full" data-name="MainHeader">
      <div className="content-stretch flex flex-col items-start pt-[40px] px-[40px] relative w-full">
        <Container />
      </div>
    </div>
  );
}

function Heading2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['Inter:Black',sans-serif] font-black justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[14px] tracking-[1.4px] w-full">
          <p className="leading-[20px]">NTH DEGREE</p>
        </div>
      </div>
    </div>
  );
}

function Background() {
  return (
    <div className="bg-[#e8e9eb] relative rounded-[2px] shrink-0" data-name="Background">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start px-[8px] py-[2px] relative">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-black w-[115.75px]">
          <p className="leading-[15px]">CLIENT ORGANISATION</p>
        </div>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[8px] relative w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#4b5563] text-[12px] w-full">
          <p className="leading-[19.5px] mb-0">A leading global trade show management, event marketing, and experiential services company</p>
          <p className="leading-[19.5px] mb-0">with nearly 50 years of history. Headquartered in Duluth, Georgia — with offices across North</p>
          <p className="leading-[19.5px] mb-0">America, Europe, and Asia — Nth Degree specialises in exhibit installation, corporate events, and</p>
          <p className="leading-[19.5px]">brand activations at flagship shows including CES and major global events.</p>
        </div>
      </div>
    </div>
  );
}

function BackgroundBorderShadow() {
  return (
    <div className="bg-white col-1 justify-self-stretch relative rounded-[2px] row-1 self-start shrink-0" data-name="Background+Border+Shadow">
      <div aria-hidden="true" className="absolute border border-[#f3f4f6] border-solid inset-0 pointer-events-none rounded-[2px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <div className="content-stretch flex flex-col gap-[4px] items-start p-[25px] relative w-full">
        <Heading2 />
        <Background />
        <Container12 />
      </div>
    </div>
  );
}

function Heading3() {
  return (
    <div className="relative shrink-0 w-full" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['Inter:Black',sans-serif] font-black justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[14px] tracking-[1.4px] w-full">
          <p className="leading-[20px]">SAKSOFT</p>
        </div>
      </div>
    </div>
  );
}

function Background1() {
  return (
    <div className="bg-[#dbeafe] relative rounded-[2px] shrink-0" data-name="Background">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start px-[8px] py-[2px] relative">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#1e40af] text-[10px] uppercase w-[97.88px]">
          <p className="leading-[15px]">DELIVERY PARTNER</p>
        </div>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[8px] relative w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#4b5563] text-[12px] w-full">
          <p className="leading-[19.5px] mb-0">A global AI-led digital transformation partner delivering cloud-native engineering, data-driven</p>
          <p className="leading-[19.5px] mb-0">platforms, and modernisation strategies. Saksoft serves as the strategic delivery partner across</p>
          <p className="leading-[19.5px]">product development, platform transformation, and operations.</p>
        </div>
      </div>
    </div>
  );
}

function BackgroundBorderShadow1() {
  return (
    <div className="bg-white col-2 justify-self-stretch relative rounded-[2px] row-1 self-start shrink-0" data-name="Background+Border+Shadow">
      <div aria-hidden="true" className="absolute border border-[#f3f4f6] border-solid inset-0 pointer-events-none rounded-[2px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <div className="content-stretch flex flex-col gap-[4px] items-start pb-[44.5px] pt-[25px] px-[25px] relative w-full">
        <Heading3 />
        <Background1 />
        <Container13 />
      </div>
    </div>
  );
}

function SectionClientPartners() {
  return (
    <div className="gap-x-[32px] gap-y-[32px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[_210px] relative shrink-0 w-full" data-name="Section - ClientPartners">
      <BackgroundBorderShadow />
      <BackgroundBorderShadow1 />
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#9ca3af] text-[10px] tracking-[3px] uppercase w-full">
        <p className="leading-[15px]">MONTHLY SNAPSHOT — FEBRUARY 2026</p>
      </div>
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 2">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[28px] justify-center leading-[0] not-italic relative shrink-0 text-[20px] text-white w-full">
        <p className="leading-[28px]">Three Programmes Delivered Material Outcomes. Two Strategic Bets Gaining Momentum.</p>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#d1d5db] text-[12px] w-full">
        <p className="mb-0">
          <span className="leading-[19.5px]">{`Platform reliability was hardened with `}</span>
          <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.5px] not-italic text-white">zero operational disruption</span>
          <span className="leading-[19.5px]">, payment accuracy improved reducing finance rework, and field-lead mobile workflows simplified. Cloud</span>
        </p>
        <p className="mb-0">
          <span className="leading-[19.5px]">{`Consolidation evaluation and FX-Exchange 3.0 are positioning the portfolio for scalable Q2 growth. Production support closed at `}</span>
          <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.5px] not-italic text-white">77% resolution rate</span>
          <span className="leading-[19.5px]">{` with no critical issues`}</span>
        </p>
        <p className="leading-[19.5px]">outstanding.</p>
      </div>
    </div>
  );
}

function SectionMonthlySnapshot() {
  return (
    <div className="bg-[#041627] relative rounded-[2px] shrink-0 w-full" data-name="Section - MonthlySnapshot">
      <div className="content-stretch flex flex-col gap-[14px] items-start p-[32px] relative w-full">
        <Container14 />
        <Heading1 />
        <Container15 />
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[16px] right-[16px] top-[16px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Black',sans-serif] font-black h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[9px] tracking-[0.9px] uppercase w-auto whitespace-nowrap">
        <p className="leading-[13.5px] whitespace-nowrap">PROGRAMMES ON TRACK</p>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[16px] right-[16px] top-[37.5px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Black',sans-serif] font-black h-[36px] justify-center leading-[0] not-italic relative shrink-0 text-[#041627] text-[30px] w-auto whitespace-nowrap">
        <p className="leading-[36px] whitespace-nowrap">7 / 9</p>
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[16px] right-[16px] top-[77.5px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#9ca3af] text-[10px] w-auto whitespace-nowrap">
        <p className="leading-[15px] whitespace-nowrap">Active this month</p>
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[16px] right-[16px] top-[100.5px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Black',sans-serif] font-black h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#006b5f] text-[10px] uppercase w-auto whitespace-nowrap">
        <p className="leading-[15px] whitespace-nowrap">↑ 78% delivery confidence</p>
      </div>
    </div>
  );
}

function MetricCard() {
  return (
    <div className="bg-white col-1 h-[131.5px] justify-self-stretch relative rounded-[2px] row-1 shrink-0" data-name="Metric Card 1">
      <div aria-hidden="true" className="absolute border-[#006b5f] border-solid border-t-2 inset-0 pointer-events-none rounded-[2px]" />
      <Container17 />
      <Container18 />
      <Container19 />
      <Container20 />
    </div>
  );
}

function Container21() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[16px] right-[16px] top-[16px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Black',sans-serif] font-black h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[9px] tracking-[0.9px] uppercase w-auto whitespace-nowrap">
        <p className="leading-[13.5px] whitespace-nowrap">PROD TICKETS RESOLVED</p>
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[16px] right-[16px] top-[37.5px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Black',sans-serif] font-black h-[36px] justify-center leading-[0] not-italic relative shrink-0 text-[#041627] text-[30px] w-auto whitespace-nowrap">
        <p className="leading-[36px] whitespace-nowrap">20 / 26</p>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[16px] right-[16px] top-[77.5px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#9ca3af] text-[10px] w-auto whitespace-nowrap">
        <p className="leading-[15px] whitespace-nowrap">77% fix rate</p>
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[16px] right-[16px] top-[100.5px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Black',sans-serif] font-black h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#006b5f] text-[10px] uppercase w-auto whitespace-nowrap">
        <p className="leading-[15px] whitespace-nowrap">↑ All P1 issues closed</p>
      </div>
    </div>
  );
}

function MetricCard1() {
  return (
    <div className="bg-white col-2 h-[131.5px] justify-self-stretch relative rounded-[2px] row-1 shrink-0" data-name="Metric Card 2">
      <div aria-hidden="true" className="absolute border-[#f05a29] border-solid border-t-2 inset-0 pointer-events-none rounded-[2px]" />
      <Container21 />
      <Container22 />
      <Container23 />
      <Container24 />
    </div>
  );
}

function Container25() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[16px] right-[16px] top-[16px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Black',sans-serif] font-black h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[9px] tracking-[0.9px] uppercase w-auto whitespace-nowrap">
        <p className="leading-[13.5px] whitespace-nowrap">TECH FOUNDATION WINS</p>
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[16px] right-[16px] top-[37.5px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Black',sans-serif] font-black h-[36px] justify-center leading-[0] not-italic relative shrink-0 text-[#041627] text-[30px] w-auto whitespace-nowrap">
        <p className="leading-[36px] whitespace-nowrap">2</p>
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[16px] right-[16px] top-[77.5px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#9ca3af] text-[10px] w-auto whitespace-nowrap">
        <p className="leading-[15px] whitespace-nowrap">Major upgrades complete</p>
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[16px] right-[16px] top-[100.5px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Black',sans-serif] font-black h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#006b5f] text-[10px] uppercase w-auto whitespace-nowrap">
        <p className="leading-[15px] whitespace-nowrap">↑ .NET Core + Flutter done</p>
      </div>
    </div>
  );
}

function MetricCard2() {
  return (
    <div className="bg-white col-3 h-[131.5px] justify-self-stretch relative rounded-[2px] row-1 shrink-0" data-name="Metric Card 3">
      <div aria-hidden="true" className="absolute border-[#1a2b3c] border-solid border-t-2 inset-0 pointer-events-none rounded-[2px]" />
      <Container25 />
      <Container26 />
      <Container27 />
      <Container28 />
    </div>
  );
}

function Container29() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[16px] right-[16px] top-[16px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Black',sans-serif] font-black h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[9px] tracking-[0.9px] uppercase w-auto whitespace-nowrap">
        <p className="leading-[13.5px] whitespace-nowrap">STRATEGIC WATCH ITEMS</p>
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[16px] right-[16px] top-[37.5px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Black',sans-serif] font-black h-[36px] justify-center leading-[0] not-italic relative shrink-0 text-[#041627] text-[30px] w-auto whitespace-nowrap">
        <p className="leading-[36px] whitespace-nowrap">3</p>
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[16px] right-[16px] top-[77.5px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#9ca3af] text-[10px] w-auto whitespace-nowrap">
        <p className="leading-[15px] whitespace-nowrap">Require attention</p>
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[16px] right-[16px] top-[100.5px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Black',sans-serif] font-black h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#ea580c] text-[10px] uppercase w-auto whitespace-nowrap">
        <p className="leading-[15px] whitespace-nowrap">→ See Section 3</p>
      </div>
    </div>
  );
}

function MetricCard3() {
  return (
    <div className="bg-white col-4 h-[131.5px] justify-self-stretch relative rounded-[2px] row-1 shrink-0" data-name="Metric Card 4">
      <div aria-hidden="true" className="absolute border-[#c83030] border-solid border-t-2 inset-0 pointer-events-none rounded-[2px]" />
      <Container29 />
      <Container30 />
      <Container31 />
      <Container32 />
    </div>
  );
}

function Container16() {
  return (
    <div className="gap-x-[16px] gap-y-[16px] grid grid-cols-[repeat(4,minmax(0,1fr))] grid-rows-[_131.50px] relative w-full" data-name="Container">
      <MetricCard />
      <MetricCard1 />
      <MetricCard2 />
      <MetricCard3 />
    </div>
  );
}

function Heading4() {
  return (
    <div className="relative shrink-0" data-name="Heading 2">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative">
        <div className="bg-[#041627] shrink-0 size-[8px]" data-name="Background" />
        <div className="flex flex-col font-['Impact:Regular',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[12px] uppercase w-[147.05px]">
          <p className="leading-[normal]">BUSINESS IMPACT</p>
        </div>
      </div>
    </div>
  );
}

function Container33() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[#9ca3af] text-[9px] tracking-[0.9px] uppercase w-[75.06px]">
          <p className="leading-[13.5px]">LAST 30 DAYS</p>
        </div>
      </div>
    </div>
  );
}

function HorizontalBorder() {
  return (
    <div className="content-stretch flex items-center justify-between pb-[10px] relative shrink-0 w-full" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#041627] border-b-2 border-solid inset-0 pointer-events-none" />
      <Heading4 />
      <Container33 />
    </div>
  );
}

function Cell() {
  return (
    <div className="relative shrink-0 w-[180.89px]" data-name="Cell">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pl-[10px] pr-px py-[16px] relative w-full">
        <div className="flex flex-col font-['Inter:Black',sans-serif] font-black h-[12px] justify-center leading-[0] not-italic relative shrink-0 text-[#9ca3af] text-[10px] tracking-[1px] uppercase w-[77.42px]">
          <p className="leading-[normal]">PROGRAMME</p>
        </div>
      </div>
    </div>
  );
}

function Cell1() {
  return (
    <div className="relative shrink-0 w-[116px]" data-name="Cell">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[10px] py-[16px] relative w-full">
        <div className="flex flex-col font-['Inter:Black',sans-serif] font-black h-[12px] justify-center leading-[0] not-italic relative shrink-0 text-[#9ca3af] text-[10px] tracking-[1px] uppercase w-[46.73px]">
          <p className="leading-[normal]">HEALTH</p>
        </div>
      </div>
    </div>
  );
}

function Cell2() {
  return (
    <div className="relative shrink-0 w-[321px]" data-name="Cell">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[10px] py-[16px] relative w-full">
        <div className="flex flex-col font-['Inter:Black',sans-serif] font-black h-[12px] justify-center leading-[0] not-italic relative shrink-0 text-[#9ca3af] text-[10px] tracking-[1px] uppercase w-[126.19px]">
          <p className="leading-[normal]">WHAT WE DELIVERED</p>
        </div>
      </div>
    </div>
  );
}

function Cell3() {
  return (
    <div className="relative shrink-0 w-[595.88px]" data-name="Cell">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[10px] py-[16px] relative w-full">
        <div className="flex flex-col font-['Inter:Black',sans-serif] font-black h-[12px] justify-center leading-[0] not-italic relative shrink-0 text-[#9ca3af] text-[10px] tracking-[1px] uppercase w-[103.63px]">
          <p className="leading-[normal]">WHY IT MATTERS</p>
        </div>
      </div>
    </div>
  );
}

function HeaderRow() {
  return (
    <div className="bg-[#041627] content-stretch flex items-start justify-center mb-[-1px] pb-px relative shrink-0 w-full" data-name="Header → Row">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-b border-solid inset-0 pointer-events-none" />
      <Cell />
      <Cell1 />
      <Cell2 />
      <Cell3 />
    </div>
  );
}

function Container34() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Black',sans-serif] font-black justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[14px] w-full">
        <p className="leading-[20px]">Revenue Programmes</p>
      </div>
    </div>
  );
}

function Container35() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[12px] w-full">
        <p className="leading-[16px]">OneView Application</p>
      </div>
    </div>
  );
}

function Data() {
  return (
    <div className="content-stretch flex flex-col items-start px-[10px] py-[16px] relative shrink-0 w-[180.89px]" data-name="Data">
      <Container34 />
      <Container35 />
    </div>
  );
}

function Data1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center px-[10px] py-[16px] relative shrink-0 w-[113px]" data-name="Data">
      <div className="bg-[#006b5f] rounded-[9999px] shrink-0 size-[8px]" data-name="Background" />
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#006b5f] text-[12px] w-[52.61px]">
        <p className="leading-[16px]">On Track</p>
      </div>
    </div>
  );
}

function Data2() {
  return (
    <div className="content-stretch flex flex-col items-start px-[10px] py-[16px] relative shrink-0 w-[321px]" data-name="Data">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#4b5563] text-[12px] w-full">
        <p className="leading-[16px] mb-0">Redesigned shopping UI; streamlined end-to-end payment</p>
        <p className="leading-[16px]">workflow</p>
      </div>
    </div>
  );
}

function Data3() {
  return (
    <div className="content-stretch flex flex-col items-start px-[10px] py-[16px] relative shrink-0 w-[594.88px]" data-name="Data">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#1f2937] text-[12px] w-full">
        <p className="leading-[16px] mb-0">Fewer abandoned transactions. Finance teams reclaim hours from corrections. Exhibitors experience</p>
        <p className="leading-[16px]">faster checkout.</p>
      </div>
    </div>
  );
}

function Row() {
  return (
    <div className="bg-white content-stretch flex gap-px items-center justify-center mb-[-1px] relative shrink-0 w-full" data-name="Row">
      <Data />
      <Data1 />
      <Data2 />
      <Data3 />
    </div>
  );
}

function Container36() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Black',sans-serif] font-black justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[14px] w-full">
        <p className="leading-[20px] mb-0">Operational</p>
        <p className="leading-[20px]">Programmes</p>
      </div>
    </div>
  );
}

function Container37() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[12px] w-full">
        <p className="leading-[16px]">On-Sight Platform</p>
      </div>
    </div>
  );
}

function Data4() {
  return (
    <div className="relative shrink-0 w-[180.89px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[10px] py-[16px] relative w-full">
        <Container36 />
        <Container37 />
      </div>
    </div>
  );
}

function Data5() {
  return (
    <div className="relative shrink-0 w-[113px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center px-[10px] py-[16px] relative w-full">
        <div className="bg-[#006b5f] rounded-[9999px] shrink-0 size-[8px]" data-name="Background" />
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#006b5f] text-[12px] w-[52.61px]">
          <p className="leading-[16px]">On Track</p>
        </div>
      </div>
    </div>
  );
}

function Data6() {
  return (
    <div className="relative shrink-0 w-[321px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[10px] py-[16px] relative w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#4b5563] text-[12px] w-full">
          <p className="leading-[16px] mb-0">Introduced Microsoft SSO; eliminated AD authentication</p>
          <p className="leading-[16px]">failures</p>
        </div>
      </div>
    </div>
  );
}

function Data7() {
  return (
    <div className="relative shrink-0 w-[594.88px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[10px] py-[16px] relative w-full">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#1f2937] text-[12px] w-[404.05px]">
          <p className="leading-[16px]">Zero-friction field access at live shows. Login disruptions eliminated.</p>
        </div>
      </div>
    </div>
  );
}

function Row1() {
  return (
    <div className="content-stretch flex gap-px items-center justify-center mb-[-1px] pt-px relative shrink-0 w-full" data-name="Row">
      <div aria-hidden="true" className="absolute border-[#dce3f2] border-solid border-t inset-0 pointer-events-none" />
      <Data4 />
      <Data5 />
      <Data6 />
      <Data7 />
    </div>
  );
}

function Container38() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Black',sans-serif] font-black justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[14px] w-full">
        <p className="leading-[20px]">Product Modernisation</p>
      </div>
    </div>
  );
}

function Container39() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[12px] w-full">
        <p className="leading-[16px]">FX-Exchange 3.0</p>
      </div>
    </div>
  );
}

function Data8() {
  return (
    <div className="relative shrink-0 w-[180.89px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[10px] py-[16px] relative w-full">
        <Container38 />
        <Container39 />
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#f59e0b] text-[12px] whitespace-nowrap">
        <p className="leading-[16px]">In Progress</p>
      </div>
    </div>
  );
}

function Data9() {
  return (
    <div className="relative shrink-0 w-[113px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center px-[10px] py-[16px] relative w-full">
        <div className="bg-[#f59e0b] h-[8px] rounded-[9999px] shrink-0 w-[7.77px]" data-name="Background" />
        <Frame2 />
      </div>
    </div>
  );
}

function Data10() {
  return (
    <div className="relative shrink-0 w-[321px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[10px] py-[16px] relative w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#4b5563] text-[12px] w-full">
          <p className="leading-[16px]">Redesigning UI/UX; aligning to cloud-native architecture</p>
        </div>
      </div>
    </div>
  );
}

function Data11() {
  return (
    <div className="relative shrink-0 w-[594.88px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[10px] py-[16px] relative w-full">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[32px] justify-center leading-[0] not-italic relative shrink-0 text-[#1f2937] text-[12px] w-[567.31px]">
          <p className="leading-[16px] mb-0">Positions FX-Exchange for deeper OASIS integration and future volume scaling without costly re-</p>
          <p className="leading-[16px]">platforming.</p>
        </div>
      </div>
    </div>
  );
}

function Row2() {
  return (
    <div className="bg-white content-stretch flex gap-px items-center justify-center mb-[-1px] pt-px relative shrink-0 w-full" data-name="Row">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-solid border-t inset-0 pointer-events-none" />
      <Data8 />
      <Data9 />
      <Data10 />
      <Data11 />
    </div>
  );
}

function Body() {
  return (
    <div className="bg-[#f5f3ef] content-stretch flex flex-col items-start mb-[-1px] pb-px relative shrink-0 w-full" data-name="Body">
      <Row />
      <Row1 />
      <Row2 />
    </div>
  );
}

function Table() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip pb-px relative shrink-0 w-full" data-name="Table">
      <HeaderRow />
      <Body />
    </div>
  );
}

function SectionBusinessImpact() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="Section - BusinessImpact">
      <HorizontalBorder />
      <Table />
    </div>
  );
}

function Heading5() {
  return (
    <div className="relative shrink-0" data-name="Heading 2">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative">
        <div className="bg-[#041627] shrink-0 size-[8px]" data-name="Background" />
        <div className="flex flex-col font-['Impact:Regular',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[12px] uppercase w-[282.47px]">
          <p className="leading-[normal]">TOP 3 OUTCOMES — LAST 30 DAYS</p>
        </div>
      </div>
    </div>
  );
}

function Container40() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[#9ca3af] text-[9px] tracking-[0.9px] uppercase w-[95.16px]">
          <p className="leading-[13.5px]">VALUE DELIVERED</p>
        </div>
      </div>
    </div>
  );
}

function HorizontalBorder1() {
  return (
    <div className="content-stretch flex items-center justify-between pb-[10px] relative shrink-0 w-full" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#041627] border-b-2 border-solid inset-0 pointer-events-none" />
      <Heading5 />
      <Container40 />
    </div>
  );
}

function Container42() {
  return (
    <div className="absolute right-[17.01px] top-[9px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative">
        <div className="flex flex-col font-['Inter:Black',sans-serif] font-black justify-center leading-[0] not-italic relative shrink-0 text-[#e8e5df] text-[48px] whitespace-nowrap">
          <p className="leading-[48px]">01</p>
        </div>
      </div>
    </div>
  );
}

function Heading6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 4">
      <div className="flex flex-col font-['Inter:Black',sans-serif] font-black justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[14px] w-full">
        <p className="leading-[20px] mb-0">Infrastructure Hardened — Zero Downtime</p>
        <p className="leading-[20px]">Migration</p>
      </div>
    </div>
  );
}

function Container44() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[0.755px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[11px] w-full">
        <p className="leading-[17.88px] mb-0">{`On-Sight & Show-Sight migrated from legacy VM SQL to High`}</p>
        <p className="leading-[17.88px] mb-0">Availability SQL. Zero service disruption during active show</p>
        <p className="leading-[17.88px]">season.</p>
      </div>
    </div>
  );
}

function Background2() {
  return (
    <div className="bg-[#f3f4f6] relative rounded-[2px] self-stretch shrink-0" data-name="Background">
      <div className="content-stretch flex flex-col h-full items-start px-[8px] py-[2px] relative">
        <div className="flex flex-col font-['Inter:Black',sans-serif] font-black h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[9px] tracking-[0.9px] uppercase w-[73.83px]">
          <p className="leading-[13.5px]">RESILIENCE ↑</p>
        </div>
      </div>
    </div>
  );
}

function Background3() {
  return (
    <div className="bg-[#f3f4f6] relative rounded-[2px] self-stretch shrink-0" data-name="Background">
      <div className="content-stretch flex flex-col h-full items-start px-[8px] py-[2px] relative">
        <div className="flex flex-col font-['Inter:Black',sans-serif] font-black h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[9px] tracking-[0.9px] uppercase w-[133.7px]">
          <p className="leading-[13.5px]">ON-SIGHT · SHOW-SIGHT</p>
        </div>
      </div>
    </div>
  );
}

function Container45() {
  return (
    <div className="content-stretch flex gap-[8px] h-[35.1px] items-start pt-[17.1px] relative shrink-0 w-full" data-name="Container">
      <Background2 />
      <Background3 />
    </div>
  );
}

function Container43() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[6.9px] items-start relative w-full">
        <Heading6 />
        <Container44 />
        <Container45 />
      </div>
    </div>
  );
}

function Outcome() {
  return (
    <div className="bg-white col-1 justify-self-stretch relative row-1 self-start shrink-0" data-name="Outcome 01">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-b-4 border-l border-r border-solid border-t inset-0 pointer-events-none shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <div className="content-stretch flex flex-col items-start pb-[28px] pt-[25px] px-[25px] relative w-full">
        <Container42 />
        <Container43 />
      </div>
    </div>
  );
}

function Container46() {
  return (
    <div className="absolute right-[17px] top-[9px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative">
        <div className="flex flex-col font-['Inter:Black',sans-serif] font-black justify-center leading-[0] not-italic relative shrink-0 text-[#e8e5df] text-[48px] whitespace-nowrap">
          <p className="leading-[48px]">02</p>
        </div>
      </div>
    </div>
  );
}

function Heading7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 4">
      <div className="flex flex-col font-['Inter:Black',sans-serif] font-black justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[14px] w-full">
        <p className="leading-[20px]">Payment Accuracy Up — Finance Rework Down</p>
      </div>
    </div>
  );
}

function Container48() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[0.755px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[11px] w-full">
        <p className="leading-[17.88px] mb-0">OneView delivers improved order accuracy and refund visibility.</p>
        <p className="leading-[17.88px] mb-0">Finance teams reclaim hours; exhibitors experience a smoother</p>
        <p className="leading-[17.88px]">checkout.</p>
      </div>
    </div>
  );
}

function Background4() {
  return (
    <div className="bg-[#fff7ed] relative rounded-[2px] self-stretch shrink-0" data-name="Background">
      <div className="content-stretch flex flex-col h-full items-start px-[8px] py-[2px] relative">
        <div className="flex flex-col font-['Inter:Black',sans-serif] font-black h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[#c2410c] text-[9px] tracking-[0.9px] uppercase w-[112.14px]">
          <p className="leading-[13.5px]">REVENUE QUALITY ↑</p>
        </div>
      </div>
    </div>
  );
}

function Background5() {
  return (
    <div className="bg-[#f3f4f6] relative rounded-[2px] self-stretch shrink-0" data-name="Background">
      <div className="content-stretch flex flex-col h-full items-start px-[8px] py-[2px] relative">
        <div className="flex flex-col font-['Inter:Black',sans-serif] font-black h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[9px] tracking-[0.9px] uppercase w-[50.75px]">
          <p className="leading-[13.5px]">ONEVIEW</p>
        </div>
      </div>
    </div>
  );
}

function Container49() {
  return (
    <div className="content-stretch flex gap-[8px] h-[35.1px] items-start pt-[17.1px] relative shrink-0 w-full" data-name="Container">
      <Background4 />
      <Background5 />
    </div>
  );
}

function Container47() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[6.9px] items-start relative w-full">
        <Heading7 />
        <Container48 />
        <Container49 />
      </div>
    </div>
  );
}

function Outcome1() {
  return (
    <div className="bg-white col-2 justify-self-stretch relative row-1 self-start shrink-0" data-name="Outcome 02">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-b-4 border-l border-r border-solid border-t inset-0 pointer-events-none shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <div className="content-stretch flex flex-col items-start pb-[48px] pt-[25px] px-[25px] relative w-full">
        <Container46 />
        <Container47 />
      </div>
    </div>
  );
}

function Container50() {
  return (
    <div className="absolute right-[17.02px] top-[9px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative">
        <div className="flex flex-col font-['Inter:Black',sans-serif] font-black justify-center leading-[0] not-italic relative shrink-0 text-[#e8e5df] text-[48px] whitespace-nowrap">
          <p className="leading-[48px]">03</p>
        </div>
      </div>
    </div>
  );
}

function Heading8() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 4">
      <div className="flex flex-col font-['Inter:Black',sans-serif] font-black justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[14px] w-full">
        <p className="leading-[20px] mb-0">Mobile Expense Workflow — Field Teams</p>
        <p className="leading-[20px]">Empowered</p>
      </div>
    </div>
  );
}

function Container52() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[0.755px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[11px] w-full">
        <p className="leading-[17.88px] mb-0">Lead expense submissions via On-Sight mobile. Faster</p>
        <p className="leading-[17.88px] mb-0">reimbursements and reduced back-office burden for every field</p>
        <p className="leading-[17.88px]">lead.</p>
      </div>
    </div>
  );
}

function Background6() {
  return (
    <div className="bg-[#ecfdf5] relative rounded-[2px] self-stretch shrink-0" data-name="Background">
      <div className="content-stretch flex flex-col h-full items-start px-[8px] py-[2px] relative">
        <div className="flex flex-col font-['Inter:Black',sans-serif] font-black h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[#047857] text-[9px] tracking-[0.9px] uppercase w-[99.7px]">
          <p className="leading-[13.5px]">OPS EFFICIENCY ↑</p>
        </div>
      </div>
    </div>
  );
}

function Background7() {
  return (
    <div className="bg-[#f3f4f6] relative rounded-[2px] self-stretch shrink-0" data-name="Background">
      <div className="content-stretch flex flex-col h-full items-start px-[8px] py-[2px] relative">
        <div className="flex flex-col font-['Inter:Black',sans-serif] font-black h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[9px] tracking-[0.9px] uppercase w-[96.63px]">
          <p className="leading-[13.5px]">ON-SIGHT MOBILE</p>
        </div>
      </div>
    </div>
  );
}

function Container53() {
  return (
    <div className="content-stretch flex gap-[8px] h-[35.1px] items-start pt-[17.1px] relative shrink-0 w-full" data-name="Container">
      <Background6 />
      <Background7 />
    </div>
  );
}

function Container51() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[6.9px] items-start relative w-full">
        <Heading8 />
        <Container52 />
        <Container53 />
      </div>
    </div>
  );
}

function Outcome2() {
  return (
    <div className="bg-white col-3 justify-self-stretch relative row-1 self-start shrink-0" data-name="Outcome 03">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-b-4 border-l border-r border-solid border-t inset-0 pointer-events-none shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <div className="content-stretch flex flex-col items-start pb-[28px] pt-[25px] px-[25px] relative w-full">
        <Container50 />
        <Container51 />
      </div>
    </div>
  );
}

function Container41() {
  return (
    <div className="gap-x-[24px] gap-y-[24px] grid grid-cols-[repeat(3,minmax(0,1fr))] grid-rows-[_196.12px] relative shrink-0 w-full" data-name="Container">
      <Outcome />
      <Outcome1 />
      <Outcome2 />
    </div>
  );
}

function SectionTop3Outcomes() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="Section - Top3Outcomes">
      <HorizontalBorder1 />
      <Container41 />
    </div>
  );
}

function Heading9() {
  return (
    <div className="relative shrink-0" data-name="Heading 2">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative">
        <div className="bg-[#041627] shrink-0 size-[8px]" data-name="Background" />
        <div className="flex flex-col font-['Impact:Regular',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[12px] uppercase w-[185.33px]">
          <p className="leading-[normal]">PRODUCTION SUPPORT</p>
        </div>
      </div>
    </div>
  );
}

function Container54() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[#9ca3af] text-[9px] tracking-[0.9px] uppercase w-[85.06px]">
          <p className="leading-[13.5px]">FEBRUARY 2026</p>
        </div>
      </div>
    </div>
  );
}

function HorizontalBorder2() {
  return (
    <div className="content-stretch flex items-center justify-between pb-[10px] relative shrink-0 w-full" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#041627] border-b-2 border-solid inset-0 pointer-events-none" />
      <Heading9 />
      <Container54 />
    </div>
  );
}

function Heading10() {
  return (
    <div className="relative shrink-0 w-full" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['Inter:Black',sans-serif] font-black justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[14px] w-full">
          <p className="leading-[20px]">Support Tickets — Reported vs. Resolved</p>
        </div>
      </div>
    </div>
  );
}

function Background8() {
  return (
    <div className="bg-[#041627] content-stretch flex h-[60px] items-center justify-center pb-[23px] pt-[22px] relative rounded-tl-[2px] rounded-tr-[2px] shrink-0 w-[20px]" data-name="Background">
      <div className="flex flex-col font-['Inter:Black',sans-serif] font-black h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-center text-white w-[6.8px]">
        <p className="leading-[15px]">8</p>
      </div>
    </div>
  );
}

function Background9() {
  return (
    <div className="bg-[#f87171] content-stretch flex h-[52px] items-center justify-center pb-[19px] pt-[18px] relative rounded-tl-[2px] rounded-tr-[2px] shrink-0 w-[20px]" data-name="Background">
      <div className="flex flex-col font-['Inter:Black',sans-serif] font-black h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-center text-white w-[5.95px]">
        <p className="leading-[15px]">7</p>
      </div>
    </div>
  );
}

function Container57() {
  return (
    <div className="content-stretch flex gap-[4px] items-end relative shrink-0" data-name="Container">
      <Background8 />
      <Background9 />
    </div>
  );
}

function Margin() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[8px] relative shrink-0" data-name="Margin">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[#9ca3af] text-[9px] uppercase w-[45.92px]">
        <p className="leading-[13.5px]">On-Sight</p>
      </div>
    </div>
  );
}

function TicketPair() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-center relative shrink-0" data-name="Ticket Pair 1">
      <Container57 />
      <Margin />
    </div>
  );
}

function Background10() {
  return (
    <div className="bg-[#041627] content-stretch flex h-[30px] items-center justify-center pb-[8px] pt-[7px] relative rounded-tl-[2px] rounded-tr-[2px] shrink-0 w-[20px]" data-name="Background">
      <div className="flex flex-col font-['Inter:Black',sans-serif] font-black h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-center text-white w-[7.03px]">
        <p className="leading-[15px]">4</p>
      </div>
    </div>
  );
}

function Background11() {
  return (
    <div className="bg-[#f87171] content-stretch flex h-[30px] items-center justify-center pb-[8px] pt-[7px] relative rounded-tl-[2px] rounded-tr-[2px] shrink-0 w-[20px]" data-name="Background">
      <div className="flex flex-col font-['Inter:Black',sans-serif] font-black h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-center text-white w-[7.03px]">
        <p className="leading-[15px]">4</p>
      </div>
    </div>
  );
}

function Container58() {
  return (
    <div className="content-stretch flex gap-[4px] items-end relative shrink-0" data-name="Container">
      <Background10 />
      <Background11 />
    </div>
  );
}

function Margin1() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[8px] relative shrink-0" data-name="Margin">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[#9ca3af] text-[9px] uppercase w-[60.42px]">
        <p className="leading-[13.5px]">Show-Sight</p>
      </div>
    </div>
  );
}

function TicketPair1() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-center relative shrink-0" data-name="Ticket Pair 2">
      <Container58 />
      <Margin1 />
    </div>
  );
}

function Background12() {
  return (
    <div className="bg-[#041627] content-stretch flex h-[38px] items-center justify-center pb-[12px] pt-[11px] relative rounded-tl-[2px] rounded-tr-[2px] shrink-0 w-[20px]" data-name="Background">
      <div className="flex flex-col font-['Inter:Black',sans-serif] font-black h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-center text-white w-[6.47px]">
        <p className="leading-[15px]">5</p>
      </div>
    </div>
  );
}

function Background13() {
  return (
    <div className="bg-[#f87171] content-stretch flex h-[22px] items-center justify-center pb-[4px] pt-[3px] relative rounded-tl-[2px] rounded-tr-[2px] shrink-0 w-[20px]" data-name="Background">
      <div className="flex flex-col font-['Inter:Black',sans-serif] font-black h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-center text-white w-[6.7px]">
        <p className="leading-[15px]">3</p>
      </div>
    </div>
  );
}

function Container59() {
  return (
    <div className="content-stretch flex gap-[4px] items-end relative shrink-0" data-name="Container">
      <Background12 />
      <Background13 />
    </div>
  );
}

function Margin2() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[8px] relative shrink-0" data-name="Margin">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[#9ca3af] text-[9px] uppercase w-[43.31px]">
        <p className="leading-[13.5px]">OneView</p>
      </div>
    </div>
  );
}

function TicketPair2() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-center relative shrink-0" data-name="Ticket Pair 3">
      <Container59 />
      <Margin2 />
    </div>
  );
}

function Background14() {
  return (
    <div className="bg-[#041627] content-stretch flex h-[22px] items-center justify-center pb-[4px] pt-[3px] relative rounded-tl-[2px] rounded-tr-[2px] shrink-0 w-[20px]" data-name="Background">
      <div className="flex flex-col font-['Inter:Black',sans-serif] font-black h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-center text-white w-[6.7px]">
        <p className="leading-[15px]">3</p>
      </div>
    </div>
  );
}

function Background15() {
  return (
    <div className="bg-[#f87171] content-stretch flex h-[15px] items-center justify-center pb-px relative rounded-tl-[2px] rounded-tr-[2px] shrink-0 w-[20px]" data-name="Background">
      <div className="flex flex-col font-['Inter:Black',sans-serif] font-black h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-center text-white w-[6.47px]">
        <p className="leading-[15px]">2</p>
      </div>
    </div>
  );
}

function Container60() {
  return (
    <div className="content-stretch flex gap-[4px] items-end relative shrink-0" data-name="Container">
      <Background14 />
      <Background15 />
    </div>
  );
}

function Margin3() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[8px] relative shrink-0" data-name="Margin">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[#9ca3af] text-[9px] uppercase w-[61.27px]">
        <p className="leading-[13.5px]">Middleware</p>
      </div>
    </div>
  );
}

function TicketPair3() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-center relative shrink-0" data-name="Ticket Pair 4">
      <Container60 />
      <Margin3 />
    </div>
  );
}

function Container56() {
  return (
    <div className="h-[135px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[48px] items-end relative size-full">
        <TicketPair />
        <TicketPair1 />
        <TicketPair2 />
        <TicketPair3 />
      </div>
    </div>
  );
}

function Container62() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[10px] uppercase w-[76.08px]">
        <p className="leading-[15px]">Reported (26)</p>
      </div>
    </div>
  );
}

function Container61() {
  return (
    <div className="relative self-stretch shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] h-full items-center relative">
        <div className="bg-[#041627] shrink-0 size-[12px]" data-name="Background" />
        <Container62 />
      </div>
    </div>
  );
}

function Container64() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[10px] uppercase w-[75.5px]">
        <p className="leading-[15px]">Resolved (20)</p>
      </div>
    </div>
  );
}

function Container63() {
  return (
    <div className="relative self-stretch shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] h-full items-center relative">
        <div className="bg-[#f87171] shrink-0 size-[12px]" data-name="Background" />
        <Container64 />
      </div>
    </div>
  );
}

function HorizontalBorder3() {
  return (
    <div className="h-[32px] relative shrink-0 w-full" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#f9fafb] border-solid border-t inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[24px] items-start pt-[17px] relative size-full">
        <Container61 />
        <Container63 />
      </div>
    </div>
  );
}

function BarChartSection() {
  return (
    <div className="bg-white col-[1/span_2] justify-self-stretch relative rounded-[2px] row-1 self-stretch shrink-0" data-name="Bar Chart Section">
      <div aria-hidden="true" className="absolute border border-[#f3f4f6] border-solid inset-0 pointer-events-none rounded-[2px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <div className="content-stretch flex flex-col gap-[32px] items-start pb-[54px] pt-[25px] px-[25px] relative size-full">
        <Heading10 />
        <Container56 />
        <HorizontalBorder3 />
      </div>
    </div>
  );
}

function Container65() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['Inter:Black',sans-serif] font-black justify-center leading-[0] not-italic relative shrink-0 text-[#9ca3af] text-[9px] tracking-[0.9px] uppercase w-full">
          <p className="leading-[13.5px]">RESOLUTION RATE</p>
        </div>
      </div>
    </div>
  );
}

function Container66() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['Inter:Black',sans-serif] font-black justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[36px] w-full">
          <p className="leading-[40px]">77%</p>
        </div>
      </div>
    </div>
  );
}

function Container67() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[10px] w-full">
          <p className="leading-[15px]">20 of 26 resolved</p>
        </div>
      </div>
    </div>
  );
}

function Svg() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="SVG">
          <path clipRule="evenodd" d={svgPaths.p18372a80} fill="var(--fill-0, #006B5F)" fillRule="evenodd" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container68() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center pt-[7.5px] relative w-full">
        <Svg />
        <div className="flex flex-col font-['Inter:Black',sans-serif] font-black h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#006b5f] text-[10px] uppercase w-[130.33px]">
          <p className="leading-[15px]">All P1/P2 Issues Closed</p>
        </div>
      </div>
    </div>
  );
}

function BackgroundBorderShadow2() {
  return (
    <div className="bg-white relative rounded-[2px] shrink-0 w-full" data-name="Background+Border+Shadow">
      <div aria-hidden="true" className="absolute border border-[#f3f4f6] border-solid inset-0 pointer-events-none rounded-[2px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <div className="content-stretch flex flex-col gap-[4px] items-start p-[25px] relative w-full">
        <Container65 />
        <Container66 />
        <Container67 />
        <Container68 />
      </div>
    </div>
  );
}

function Container69() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['Inter:Black',sans-serif] font-black justify-center leading-[0] not-italic relative shrink-0 text-[#9ca3af] text-[9px] tracking-[0.9px] uppercase w-full">
          <p className="leading-[13.5px]">CARRIED FORWARD</p>
        </div>
      </div>
    </div>
  );
}

function Container70() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['Inter:Black',sans-serif] font-black justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[36px] w-full">
          <p className="leading-[40px]">6</p>
        </div>
      </div>
    </div>
  );
}

function Container71() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[10px] w-full">
          <p className="leading-[15px]">Scheduled for next month</p>
        </div>
      </div>
    </div>
  );
}

function Svg1() {
  return (
    <div className="relative size-[12px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="SVG">
          <path clipRule="evenodd" d={svgPaths.p24e83e00} fill="var(--fill-0, #EA580C)" fillRule="evenodd" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container72() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center pt-[7.5px] relative w-full">
        <div className="flex items-center justify-center relative shrink-0 size-[12px]" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "19" } as React.CSSProperties}>
          <div className="flex-none rotate-90">
            <Svg1 />
          </div>
        </div>
        <div className="flex flex-col font-['Inter:Black',sans-serif] font-black h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#ea580c] text-[10px] uppercase w-[176.41px]">
          <p className="leading-[15px]">No critical items outstanding</p>
        </div>
      </div>
    </div>
  );
}

function BackgroundBorderShadow3() {
  return (
    <div className="bg-white relative rounded-[2px] shrink-0 w-full" data-name="Background+Border+Shadow">
      <div aria-hidden="true" className="absolute border border-[#f3f4f6] border-solid inset-0 pointer-events-none rounded-[2px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <div className="content-stretch flex flex-col gap-[4px] items-start p-[25px] relative w-full">
        <Container69 />
        <Container70 />
        <Container71 />
        <Container72 />
      </div>
    </div>
  );
}

function ResolutionRates() {
  return (
    <div className="col-3 content-stretch flex flex-col gap-[16px] items-start justify-self-stretch relative row-1 self-start shrink-0" data-name="Resolution Rates">
      <BackgroundBorderShadow2 />
      <BackgroundBorderShadow3 />
    </div>
  );
}

function Container55() {
  return (
    <div className="gap-x-[24px] gap-y-[24px] grid grid-cols-[repeat(3,minmax(0,1fr))] grid-rows-[_323px] relative shrink-0 w-full" data-name="Container">
      <BarChartSection />
      <ResolutionRates />
    </div>
  );
}

function SectionProductionSupport() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="Section - ProductionSupport">
      <HorizontalBorder2 />
      <Container55 />
    </div>
  );
}

function Svg2() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="SVG">
          <path d={svgPaths.p3a40c680} id="Vector" stroke="var(--stroke-0, #9CA3AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Heading11() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Heading 2">
      <div className="flex flex-col font-['Impact:Regular',sans-serif] h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#9ca3af] text-[10px] uppercase w-[218.19px]">
        <p className="leading-[normal]">TOP 3 STRATEGIC WATCH ITEMS</p>
      </div>
    </div>
  );
}

function Container73() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Container">
      <Svg2 />
      <Heading11 />
    </div>
  );
}

function Svg3() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="SVG">
          <path d={svgPaths.pa5d2100} id="Vector" stroke="var(--stroke-0, #DC2626)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Background16() {
  return (
    <div className="absolute bg-[#fef2f2] content-stretch flex items-center justify-center left-[25px] rounded-[2px] size-[32px] top-[25px]" data-name="Background">
      <Svg3 />
    </div>
  );
}

function Heading12() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[25px] right-[25.01px] top-[25px]" data-name="Heading 4">
      <div className="flex flex-col font-['Inter:Black',sans-serif] font-black h-[40px] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[14px] uppercase w-[312.89px]">
        <p className="leading-[20px] mb-0">OneView — Post-Migration Monitoring</p>
        <p className="leading-[20px]">Active</p>
      </div>
    </div>
  );
}

function Container75() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[25px] right-[25.01px] top-[69px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[33px] justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[10px] w-[331.84px]">
        <p className="leading-[16.25px] mb-0">HA SQL confirmed stable. Any regression in payment pipeline must be</p>
        <p className="leading-[16.25px]">escalated immediately.</p>
      </div>
    </div>
  );
}

function Background17() {
  return (
    <div className="absolute bg-[#fef2f2] content-stretch flex items-start left-[25px] px-[8px] py-[0.5px] rounded-[2px] top-[124.5px]" data-name="Background">
      <div className="flex flex-col font-['Inter:Black',sans-serif] font-black h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[#dc2626] text-[9px] uppercase w-[34.66px]">
        <p className="leading-[13.5px]">WATCH</p>
      </div>
    </div>
  );
}

function Watch() {
  return (
    <div className="bg-white col-1 h-[164px] justify-self-stretch relative rounded-[2px] row-1 shrink-0" data-name="Watch 1">
      <div aria-hidden="true" className="absolute border border-[#f3f4f6] border-solid inset-0 pointer-events-none rounded-[2px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <Heading12 />
      <Container75 />
      <Background17 />
    </div>
  );
}

function Svg4() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="SVG">
          <path d={svgPaths.p1d49b600} id="Vector" stroke="var(--stroke-0, #EA580C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Background18() {
  return (
    <div className="absolute bg-[#fff7ed] content-stretch flex items-center justify-center left-[25px] rounded-[2px] size-[32px] top-[25px]" data-name="Background">
      <Svg4 />
    </div>
  );
}

function Heading13() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[25px] right-[25px] top-[25px]" data-name="Heading 4">
      <div className="flex flex-col font-['Inter:Black',sans-serif] font-black h-[40px] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[14px] uppercase w-[337.97px]">
        <p className="leading-[20px] mb-0">FX-Exchange — OASIS Integration Scoping</p>
        <p className="leading-[20px]">Needed</p>
      </div>
    </div>
  );
}

function Container76() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[25px] right-[25px] top-[69px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[33px] justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[10px] w-[324.51px]">
        <p className="leading-[16.25px] mb-0">Architecture decisions this month determine Q3 delivery confidence.</p>
        <p className="leading-[16.25px]">Product owner input required.</p>
      </div>
    </div>
  );
}

function Background19() {
  return (
    <div className="absolute bg-[#fff7ed] content-stretch flex items-start left-[25px] px-[8px] py-[0.5px] rounded-[2px] top-[124.5px]" data-name="Background">
      <div className="flex flex-col font-['Inter:Black',sans-serif] font-black h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[#ea580c] text-[9px] uppercase w-[66.41px]">
        <p className="leading-[13.5px]">INPUT NEEDED</p>
      </div>
    </div>
  );
}

function Watch1() {
  return (
    <div className="bg-white col-2 h-[164px] justify-self-stretch relative rounded-[2px] row-1 shrink-0" data-name="Watch 2">
      <div aria-hidden="true" className="absolute border border-[#f3f4f6] border-solid inset-0 pointer-events-none rounded-[2px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <Heading13 />
      <Container76 />
      <Background19 />
    </div>
  );
}

function Svg5() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="SVG">
          <path d={svgPaths.p1446d300} id="Vector" stroke="var(--stroke-0, #059669)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Background20() {
  return (
    <div className="absolute bg-[#ecfdf5] content-stretch flex items-center justify-center left-[25px] rounded-[2px] size-[32px] top-[25px]" data-name="Background">
      <Svg5 />
    </div>
  );
}

function Heading14() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[25px] right-[25.01px] top-[25px]" data-name="Heading 4">
      <div className="flex flex-col font-['Inter:Black',sans-serif] font-black h-[40px] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[14px] uppercase w-[297.76px]">
        <p className="leading-[20px] mb-0">Onboarding — Positive Signal Worth</p>
        <p className="leading-[20px]">Scaling</p>
      </div>
    </div>
  );
}

function Container77() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[25px] right-[25.01px] top-[69px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[33px] justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[10px] w-[342.94px]">
        <p className="leading-[16.25px] mb-0">Improvements reducing setup errors and back-office effort. Recommend</p>
        <p className="leading-[16.25px]">monthly velocity tracking.</p>
      </div>
    </div>
  );
}

function Background21() {
  return (
    <div className="absolute bg-[#ecfdf5] content-stretch flex items-start left-[25px] px-[8px] py-[0.5px] rounded-[2px] top-[124.5px]" data-name="Background">
      <div className="flex flex-col font-['Inter:Black',sans-serif] font-black h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[#059669] text-[9px] uppercase w-[79.34px]">
        <p className="leading-[13.5px]">POSITIVE SIGNAL</p>
      </div>
    </div>
  );
}

function Watch2() {
  return (
    <div className="bg-white col-3 h-[164px] justify-self-stretch relative rounded-[2px] row-1 shrink-0" data-name="Watch 3">
      <div aria-hidden="true" className="absolute border border-[#f3f4f6] border-solid inset-0 pointer-events-none rounded-[2px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <Heading14 />
      <Container77 />
      <Background21 />
    </div>
  );
}

function Container74() {
  return (
    <div className="gap-x-[24px] gap-y-[24px] grid grid-cols-[repeat(3,minmax(0,1fr))] grid-rows-[_164px] relative shrink-0 w-full" data-name="Container">
      <Watch />
      <Watch1 />
      <Watch2 />
    </div>
  );
}

function SectionWatchItems() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="Section - WatchItems">
      <Container73 />
      <Container74 />
    </div>
  );
}

function Heading15() {
  return (
    <div className="relative shrink-0" data-name="Heading 2">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative">
        <div className="bg-[#041627] shrink-0 size-[8px]" data-name="Background" />
        <div className="flex flex-col font-['Impact:Regular',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[12px] uppercase w-[160.41px]">
          <p className="leading-[normal]">RELEASE FORECAST</p>
        </div>
      </div>
    </div>
  );
}

function Container78() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[#9ca3af] text-[9px] tracking-[0.9px] uppercase w-[117.03px]">
          <p className="leading-[13.5px]">SCHEDULED OUTLOOK</p>
        </div>
      </div>
    </div>
  );
}

function HorizontalBorder4() {
  return (
    <div className="content-stretch flex items-center justify-between pb-[10px] relative shrink-0 w-full" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#041627] border-b-2 border-solid inset-0 pointer-events-none" />
      <Heading15 />
      <Container78 />
    </div>
  );
}

function Heading16() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Heading 4">
      <div className="flex flex-col font-['Inter:Black',sans-serif] font-black h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[14px] w-[185.88px]">
        <p className="leading-[20px]">Show-Sight Mobile V2.0.0</p>
      </div>
    </div>
  );
}

function Background22() {
  return (
    <div className="bg-[#ffedd5] content-stretch flex flex-col items-start px-[6px] py-[2px] relative rounded-[4px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Black',sans-serif] font-black h-[12px] justify-center leading-[0] not-italic relative shrink-0 text-[#9a3412] text-[8px] uppercase w-[42.38px]">
        <p className="leading-[12px]">MAR 2026</p>
      </div>
    </div>
  );
}

function Container81() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Container">
      <Heading16 />
      <Background22 />
    </div>
  );
}

function Container82() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[10px] w-full">
        <p className="leading-[15px]">Upgraded Job Search, show-specific photo categories, Evaluation submissions, and Safety Meeting Topics.</p>
      </div>
    </div>
  );
}

function Container80() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative w-full">
        <Container81 />
        <Container82 />
      </div>
    </div>
  );
}

function BackgroundBorder() {
  return (
    <div className="bg-white col-1 h-[81px] justify-self-stretch relative row-1 shrink-0" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border-[#0b9f6e] border-l-2 border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row justify-center size-full">
        <div className="content-stretch flex items-start justify-center pl-[22px] pr-[20px] py-[20px] relative size-full">
          <Container80 />
        </div>
      </div>
    </div>
  );
}

function Heading17() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Heading 4">
      <div className="flex flex-col font-['Inter:Black',sans-serif] font-black h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[14px] w-[241.02px]">
        <p className="leading-[20px]">Fern Onboarding Self-Registration</p>
      </div>
    </div>
  );
}

function Background23() {
  return (
    <div className="bg-[#ffedd5] content-stretch flex flex-col items-start px-[6px] py-[2px] relative rounded-[4px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Black',sans-serif] font-black h-[12px] justify-center leading-[0] not-italic relative shrink-0 text-[#9a3412] text-[8px] uppercase w-[42.38px]">
        <p className="leading-[12px]">MAR 2026</p>
      </div>
    </div>
  );
}

function Container84() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Container">
      <Heading17 />
      <Background23 />
    </div>
  );
}

function Container85() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[10px] w-full">
        <p className="leading-[15px]">Eliminates manual onboarding bottlenecks. Self-registration with optimised approval flow.</p>
      </div>
    </div>
  );
}

function Container83() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative w-full">
        <Container84 />
        <Container85 />
      </div>
    </div>
  );
}

function BackgroundBorder1() {
  return (
    <div className="bg-white col-2 h-[81px] justify-self-stretch relative row-1 shrink-0" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border-[#0b9f6e] border-l-2 border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row justify-center size-full">
        <div className="content-stretch flex items-start justify-center pl-[22px] pr-[20px] py-[20px] relative size-full">
          <Container83 />
        </div>
      </div>
    </div>
  );
}

function Container79() {
  return (
    <div className="gap-x-[16px] gap-y-[16px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[_81px] relative shrink-0 w-full" data-name="Container">
      <BackgroundBorder />
      <BackgroundBorder1 />
    </div>
  );
}

function Cell4() {
  return (
    <div className="content-stretch flex flex-col items-start px-[16px] py-[12px] relative shrink-0 w-[202.38px]" data-name="Cell">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[12px] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-white tracking-[1px] uppercase w-[53.75px]">
        <p className="leading-[normal]">PROJECT</p>
      </div>
    </div>
  );
}

function Cell5() {
  return (
    <div className="content-stretch flex flex-col items-start px-[16px] py-[12px] relative shrink-0 w-[419.53px]" data-name="Cell">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[12px] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-white tracking-[1px] uppercase w-[83.55px]">
        <p className="leading-[normal]">RELEASE ITEM</p>
      </div>
    </div>
  );
}

function Cell6() {
  return (
    <div className="content-stretch flex flex-col items-start px-[16px] py-[12px] relative shrink-0 w-[187.25px]" data-name="Cell">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[12px] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-white tracking-[1px] uppercase w-[62px]">
        <p className="leading-[normal]">PROGRESS</p>
      </div>
    </div>
  );
}

function Cell7() {
  return (
    <div className="content-stretch flex flex-col items-start px-[16px] py-[12px] relative shrink-0 w-[261.11px]" data-name="Cell">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[12px] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-white tracking-[1px] uppercase w-[61.77px]">
        <p className="leading-[normal]">SCHEDULE</p>
      </div>
    </div>
  );
}

function Cell8() {
  return (
    <div className="content-stretch flex flex-col items-end px-[16px] py-[12px] relative shrink-0 w-[159.73px]" data-name="Cell">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[12px] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-right text-white tracking-[1px] uppercase w-[45.39px]">
        <p className="leading-[normal]">STATUS</p>
      </div>
    </div>
  );
}

function HeaderRow1() {
  return (
    <div className="bg-[#041627] content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Header → Row">
      <Cell4 />
      <Cell5 />
      <Cell6 />
      <Cell7 />
      <Cell8 />
    </div>
  );
}

function Data12() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[20px] pt-[19.5px] px-[16px] relative shrink-0 w-[202.38px]" data-name="Data">
      <div className="flex flex-col font-['Inter:Black',sans-serif] font-black h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[11px] w-[50.14px]">
        <p className="leading-[normal]">On-Sight</p>
      </div>
    </div>
  );
}

function Data13() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[20px] pt-[19.5px] px-[16px] relative shrink-0 w-[419.53px]" data-name="Data">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[#4b5563] text-[11px] w-[132.16px]">
        <p className="leading-[normal]">Lead Travel Expense App</p>
      </div>
    </div>
  );
}

function Data14() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[20px] pt-[19.5px] px-[16px] relative shrink-0 w-[187.25px]" data-name="Data">
      <div className="flex flex-col font-['Inter:Black',sans-serif] font-black h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[#006b5f] text-[11px] w-[32.11px]">
        <p className="leading-[normal]">100%</p>
      </div>
    </div>
  );
}

function Background24() {
  return (
    <div className="bg-[#f3f4f6] content-stretch flex flex-col h-[6px] items-start justify-center overflow-clip relative rounded-[9999px] shrink-0 w-full" data-name="Background">
      <div className="bg-[#006b5f] flex-[1_0_0] min-h-px min-w-px w-full" data-name="Background" />
    </div>
  );
}

function Data15() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start p-[16px] relative shrink-0 w-[261.11px]" data-name="Data">
      <Background24 />
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[11px] justify-center leading-[0] not-italic relative shrink-0 text-[#006b5f] text-[9px] uppercase w-[99.08px]">
        <p className="leading-[normal]">Releasing Mar 2026</p>
      </div>
    </div>
  );
}

function Data16() {
  return (
    <div className="content-stretch flex flex-col items-end pb-[21.5px] pt-[21px] px-[16px] relative shrink-0 w-[159.73px]" data-name="Data">
      <div className="flex flex-col font-['Inter:Black',sans-serif] font-black h-[11px] justify-center leading-[0] not-italic relative shrink-0 text-[#006b5f] text-[9px] text-right uppercase w-[48.17px]">
        <p className="leading-[normal]">ON TRACK</p>
      </div>
    </div>
  );
}

function Row3() {
  return (
    <div className="content-stretch flex items-start justify-center mb-[-1px] relative shrink-0 w-full" data-name="Row 1">
      <Data12 />
      <Data13 />
      <Data14 />
      <Data15 />
      <Data16 />
    </div>
  );
}

function Data17() {
  return (
    <div className="relative shrink-0 w-[202.38px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[16px] py-[20px] relative w-full">
        <div className="flex flex-col font-['Inter:Black',sans-serif] font-black h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[11px] w-[50.14px]">
          <p className="leading-[normal]">On-Sight</p>
        </div>
      </div>
    </div>
  );
}

function Data18() {
  return (
    <div className="relative shrink-0 w-[419.53px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[16px] py-[20px] relative w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[#4b5563] text-[11px] w-[132.33px]">
          <p className="leading-[normal]">Fern Onboarding Phase 2</p>
        </div>
      </div>
    </div>
  );
}

function Data19() {
  return (
    <div className="relative shrink-0 w-[187.25px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[16px] py-[20px] relative w-full">
        <div className="flex flex-col font-['Inter:Black',sans-serif] font-black h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[#fb923c] text-[11px] w-[25.03px]">
          <p className="leading-[normal]">75%</p>
        </div>
      </div>
    </div>
  );
}

function Background25() {
  return (
    <div className="bg-[#f3f4f6] h-[6px] overflow-clip relative rounded-[9999px] shrink-0 w-full" data-name="Background">
      <div className="absolute bg-[#fb923c] bottom-0 left-0 right-1/4 top-0" data-name="Background" />
    </div>
  );
}

function Data20() {
  return (
    <div className="relative shrink-0 w-[261.11px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start px-[16px] py-[16.5px] relative w-full">
        <Background25 />
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[11px] justify-center leading-[0] not-italic relative shrink-0 text-[#9ca3af] text-[9px] uppercase w-[78.13px]">
          <p className="leading-[normal]">Mar — Apr 2026</p>
        </div>
      </div>
    </div>
  );
}

function Data21() {
  return (
    <div className="relative shrink-0 w-[159.73px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-end px-[16px] py-[21.5px] relative w-full">
        <div className="flex flex-col font-['Inter:Black',sans-serif] font-black h-[11px] justify-center leading-[0] not-italic relative shrink-0 text-[#006b5f] text-[9px] text-right uppercase w-[48.17px]">
          <p className="leading-[normal]">ON TRACK</p>
        </div>
      </div>
    </div>
  );
}

function Row4() {
  return (
    <div className="content-stretch flex items-start justify-center mb-[-1px] pt-px relative shrink-0 w-full" data-name="Row 2">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-solid border-t inset-0 pointer-events-none" />
      <Data17 />
      <Data18 />
      <Data19 />
      <Data20 />
      <Data21 />
    </div>
  );
}

function Data22() {
  return (
    <div className="relative shrink-0 w-[202.38px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[16px] py-[20px] relative w-full">
        <div className="flex flex-col font-['Inter:Black',sans-serif] font-black h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[11px] w-[65.36px]">
          <p className="leading-[normal]">Show-Sight</p>
        </div>
      </div>
    </div>
  );
}

function Data23() {
  return (
    <div className="relative shrink-0 w-[419.53px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[16px] py-[20px] relative w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[#4b5563] text-[11px] w-[178.61px]">
          <p className="leading-[normal]">{`Job Photos, Eval & Safety Meeting`}</p>
        </div>
      </div>
    </div>
  );
}

function Data24() {
  return (
    <div className="relative shrink-0 w-[187.25px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[16px] py-[20px] relative w-full">
        <div className="flex flex-col font-['Inter:Black',sans-serif] font-black h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[#006b5f] text-[11px] w-[26.73px]">
          <p className="leading-[normal]">90%</p>
        </div>
      </div>
    </div>
  );
}

function Background26() {
  return (
    <div className="bg-[#f3f4f6] h-[6px] overflow-clip relative rounded-[9999px] shrink-0 w-full" data-name="Background">
      <div className="absolute bg-[#006b5f] inset-[0_10%_0_0]" data-name="Background" />
    </div>
  );
}

function Data25() {
  return (
    <div className="relative shrink-0 w-[261.11px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start px-[16px] py-[16.5px] relative w-full">
        <Background26 />
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[11px] justify-center leading-[0] not-italic relative shrink-0 text-[#006b5f] text-[9px] uppercase w-[99.08px]">
          <p className="leading-[normal]">Releasing Mar 2026</p>
        </div>
      </div>
    </div>
  );
}

function Data26() {
  return (
    <div className="relative shrink-0 w-[159.73px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-end px-[16px] py-[21.5px] relative w-full">
        <div className="flex flex-col font-['Inter:Black',sans-serif] font-black h-[11px] justify-center leading-[0] not-italic relative shrink-0 text-[#006b5f] text-[9px] text-right uppercase w-[48.17px]">
          <p className="leading-[normal]">ON TRACK</p>
        </div>
      </div>
    </div>
  );
}

function Row5() {
  return (
    <div className="content-stretch flex items-start justify-center mb-[-1px] pt-px relative shrink-0 w-full" data-name="Row 3">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-solid border-t inset-0 pointer-events-none" />
      <Data22 />
      <Data23 />
      <Data24 />
      <Data25 />
      <Data26 />
    </div>
  );
}

function Data27() {
  return (
    <div className="relative shrink-0 w-[202.38px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[16px] py-[20px] relative w-full">
        <div className="flex flex-col font-['Inter:Black',sans-serif] font-black h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[11px] w-[65.36px]">
          <p className="leading-[normal]">Show-Sight</p>
        </div>
      </div>
    </div>
  );
}

function Data28() {
  return (
    <div className="relative shrink-0 w-[419.53px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[16px] py-[20px] relative w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[#4b5563] text-[11px] w-[126.97px]">
          <p className="leading-[normal]">Incident Reports Module</p>
        </div>
      </div>
    </div>
  );
}

function Data29() {
  return (
    <div className="relative shrink-0 w-[187.25px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[16px] py-[20px] relative w-full">
        <div className="flex flex-col font-['Inter:Black',sans-serif] font-black h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[#2563eb] text-[11px] w-[19.31px]">
          <p className="leading-[normal]">0%</p>
        </div>
      </div>
    </div>
  );
}

function Background27() {
  return (
    <div className="bg-[#f3f4f6] h-[6px] overflow-clip relative rounded-[9999px] shrink-0 w-full" data-name="Background">
      <div className="absolute bg-[#2563eb] inset-[0_95%_0_0]" data-name="Background" />
    </div>
  );
}

function Data30() {
  return (
    <div className="relative shrink-0 w-[261.11px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start px-[16px] py-[16.5px] relative w-full">
        <Background27 />
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[11px] justify-center leading-[0] not-italic relative shrink-0 text-[#2563eb] text-[9px] uppercase w-[84.05px]">
          <p className="leading-[normal]">Starts Mar 2026</p>
        </div>
      </div>
    </div>
  );
}

function Data31() {
  return (
    <div className="relative shrink-0 w-[159.73px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-end px-[16px] py-[21.5px] relative w-full">
        <div className="flex flex-col font-['Inter:Black',sans-serif] font-black h-[11px] justify-center leading-[0] not-italic relative shrink-0 text-[#2563eb] text-[9px] text-right uppercase w-[22.19px]">
          <p className="leading-[normal]">NEW</p>
        </div>
      </div>
    </div>
  );
}

function Row6() {
  return (
    <div className="content-stretch flex items-start justify-center mb-[-1px] pt-px relative shrink-0 w-full" data-name="Row 4">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-solid border-t inset-0 pointer-events-none" />
      <Data27 />
      <Data28 />
      <Data29 />
      <Data30 />
      <Data31 />
    </div>
  );
}

function Data32() {
  return (
    <div className="relative shrink-0 w-[202.38px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[16px] py-[20px] relative w-full">
        <div className="flex flex-col font-['Inter:Black',sans-serif] font-black h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[11px] w-[49.8px]">
          <p className="leading-[normal]">OneView</p>
        </div>
      </div>
    </div>
  );
}

function Data33() {
  return (
    <div className="relative shrink-0 w-[419.53px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[16px] py-[20px] relative w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[#4b5563] text-[11px] w-[117.34px]">
          <p className="leading-[normal]">Product Discount Flow</p>
        </div>
      </div>
    </div>
  );
}

function Data34() {
  return (
    <div className="relative shrink-0 w-[187.25px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[16px] py-[20px] relative w-full">
        <div className="flex flex-col font-['Inter:Black',sans-serif] font-black h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[#006b5f] text-[11px] w-[26.73px]">
          <p className="leading-[normal]">90%</p>
        </div>
      </div>
    </div>
  );
}

function Background28() {
  return (
    <div className="bg-[#f3f4f6] h-[6px] overflow-clip relative rounded-[9999px] shrink-0 w-full" data-name="Background">
      <div className="absolute bg-[#006b5f] inset-[0_10%_0_0]" data-name="Background" />
    </div>
  );
}

function Data35() {
  return (
    <div className="relative shrink-0 w-[261.11px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start px-[16px] py-[16.5px] relative w-full">
        <Background28 />
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[11px] justify-center leading-[0] not-italic relative shrink-0 text-[#006b5f] text-[9px] uppercase w-[99.08px]">
          <p className="leading-[normal]">Releasing Mar 2026</p>
        </div>
      </div>
    </div>
  );
}

function Data36() {
  return (
    <div className="relative shrink-0 w-[159.73px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-end px-[16px] py-[21.5px] relative w-full">
        <div className="flex flex-col font-['Inter:Black',sans-serif] font-black h-[11px] justify-center leading-[0] not-italic relative shrink-0 text-[#006b5f] text-[9px] text-right uppercase w-[48.17px]">
          <p className="leading-[normal]">ON TRACK</p>
        </div>
      </div>
    </div>
  );
}

function Row7() {
  return (
    <div className="content-stretch flex items-start justify-center mb-[-1px] pt-px relative shrink-0 w-full" data-name="Row 5">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-solid border-t inset-0 pointer-events-none" />
      <Data32 />
      <Data33 />
      <Data34 />
      <Data35 />
      <Data36 />
    </div>
  );
}

function Data37() {
  return (
    <div className="relative shrink-0 w-[202.38px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[19.5px] pt-[20px] px-[16px] relative w-full">
        <div className="flex flex-col font-['Inter:Black',sans-serif] font-black h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[11px] w-[69.59px]">
          <p className="leading-[normal]">FXExchange</p>
        </div>
      </div>
    </div>
  );
}

function Data38() {
  return (
    <div className="relative shrink-0 w-[419.53px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[19.5px] pt-[20px] px-[16px] relative w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[#4b5563] text-[11px] w-[166.75px]">
          <p className="leading-[normal]">FX-Exchange 3.0 Modernisation</p>
        </div>
      </div>
    </div>
  );
}

function Data39() {
  return (
    <div className="relative shrink-0 w-[187.25px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[19.5px] pt-[20px] px-[16px] relative w-full">
        <div className="flex flex-col font-['Inter:Black',sans-serif] font-black h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[#fb923c] text-[11px] w-[25.03px]">
          <p className="leading-[normal]">75%</p>
        </div>
      </div>
    </div>
  );
}

function Background29() {
  return (
    <div className="bg-[#f3f4f6] h-[6px] overflow-clip relative rounded-[9999px] shrink-0 w-full" data-name="Background">
      <div className="absolute bg-[#fb923c] bottom-0 left-0 right-1/4 top-0" data-name="Background" />
    </div>
  );
}

function Data40() {
  return (
    <div className="relative shrink-0 w-[261.11px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start p-[16px] relative w-full">
        <Background29 />
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[11px] justify-center leading-[0] not-italic relative shrink-0 text-[#9ca3af] text-[9px] uppercase w-[80.64px]">
          <p className="leading-[normal]">Mar — May 2026</p>
        </div>
      </div>
    </div>
  );
}

function Data41() {
  return (
    <div className="relative shrink-0 w-[159.73px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-end pb-[21px] pt-[21.5px] px-[16px] relative w-full">
        <div className="flex flex-col font-['Inter:Black',sans-serif] font-black h-[11px] justify-center leading-[0] not-italic relative shrink-0 text-[#fb923c] text-[9px] text-right uppercase w-[34.66px]">
          <p className="leading-[normal]">WATCH</p>
        </div>
      </div>
    </div>
  );
}

function Row8() {
  return (
    <div className="content-stretch flex items-start justify-center mb-[-1px] pt-px relative shrink-0 w-full" data-name="Row 6">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-solid border-t inset-0 pointer-events-none" />
      <Data37 />
      <Data38 />
      <Data39 />
      <Data40 />
      <Data41 />
    </div>
  );
}

function Body1() {
  return (
    <div className="content-stretch flex flex-col items-start pb-px relative shrink-0 w-full" data-name="Body">
      <Row3 />
      <Row4 />
      <Row5 />
      <Row6 />
      <Row7 />
      <Row8 />
    </div>
  );
}

function Table1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Table">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <HeaderRow1 />
        <Body1 />
      </div>
    </div>
  );
}

function BackgroundBorder2() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Background+Border">
      <div className="content-stretch flex flex-col items-start overflow-clip pb-px pt-[9px] px-px relative rounded-[inherit] w-full">
        <Table1 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#f3f4f6] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function SectionReleaseForecast() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="Section - ReleaseForecast">
      <HorizontalBorder4 />
      <Container79 />
      <BackgroundBorder2 />
    </div>
  );
}

function Heading18() {
  return (
    <div className="relative shrink-0" data-name="Heading 2">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative">
        <div className="bg-[#041627] shrink-0 size-[8px]" data-name="Background" />
        <div className="flex flex-col font-['Impact:Regular',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[12px] uppercase w-[257.34px]">
          <p className="leading-[normal]">{`MODERNISATION & INNOVATION`}</p>
        </div>
      </div>
    </div>
  );
}

function Container86() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[#9ca3af] text-[9px] tracking-[0.9px] uppercase w-[138.08px]">
          <p className="leading-[13.5px]">STRATEGIC INVESTMENTS</p>
        </div>
      </div>
    </div>
  );
}

function HorizontalBorder5() {
  return (
    <div className="content-stretch flex items-center justify-between pb-[10px] relative shrink-0 w-full" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#041627] border-b-2 border-solid inset-0 pointer-events-none" />
      <Heading18 />
      <Container86 />
    </div>
  );
}

function Heading19() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Heading 4">
      <div className="flex flex-col font-['Inter:Black',sans-serif] font-black h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[14px] w-[185.88px]">
        <p className="leading-[20px]">Show-Sight Mobile V2.0.0</p>
      </div>
    </div>
  );
}

function Background30() {
  return (
    <div className="bg-[#ffedd5] content-stretch flex flex-col items-start px-[6px] py-[2px] relative rounded-[4px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Black',sans-serif] font-black h-[12px] justify-center leading-[0] not-italic relative shrink-0 text-[#9a3412] text-[8px] uppercase w-[42.38px]">
        <p className="leading-[12px]">MAR 2026</p>
      </div>
    </div>
  );
}

function Container90() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Container">
      <Heading19 />
      <Background30 />
    </div>
  );
}

function Container91() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[10px] w-full">
        <p className="leading-[15px]">Upgraded Job Search, show-specific photo categories, Evaluation submissions, and Safety Meeting Topics.</p>
      </div>
    </div>
  );
}

function Container89() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative w-full">
        <Container90 />
        <Container91 />
      </div>
    </div>
  );
}

function BackgroundBorder3() {
  return (
    <div className="bg-white col-1 h-[81px] justify-self-stretch relative row-1 shrink-0" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border-[#0b9f6e] border-l-2 border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row justify-center size-full">
        <div className="content-stretch flex items-start justify-center pl-[22px] pr-[20px] py-[20px] relative size-full">
          <Container89 />
        </div>
      </div>
    </div>
  );
}

function Heading20() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Heading 4">
      <div className="flex flex-col font-['Inter:Black',sans-serif] font-black h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[14px] w-[241.02px]">
        <p className="leading-[20px]">Fern Onboarding Self-Registration</p>
      </div>
    </div>
  );
}

function Background31() {
  return (
    <div className="bg-[#ffedd5] content-stretch flex flex-col items-start px-[6px] py-[2px] relative rounded-[4px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Black',sans-serif] font-black h-[12px] justify-center leading-[0] not-italic relative shrink-0 text-[#9a3412] text-[8px] uppercase w-[42.38px]">
        <p className="leading-[12px]">MAR 2026</p>
      </div>
    </div>
  );
}

function Container93() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Container">
      <Heading20 />
      <Background31 />
    </div>
  );
}

function Container94() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[10px] w-full">
        <p className="leading-[15px]">Eliminates manual onboarding bottlenecks. Self-registration with optimised approval flow.</p>
      </div>
    </div>
  );
}

function Container92() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative w-full">
        <Container93 />
        <Container94 />
      </div>
    </div>
  );
}

function BackgroundBorder4() {
  return (
    <div className="bg-white col-2 h-[81px] justify-self-stretch relative row-1 shrink-0" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border-[#0b9f6e] border-l-2 border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row justify-center size-full">
        <div className="content-stretch flex items-start justify-center pl-[22px] pr-[20px] py-[20px] relative size-full">
          <Container92 />
        </div>
      </div>
    </div>
  );
}

function Container88() {
  return (
    <div className="gap-x-[16px] gap-y-[16px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[_81px] relative shrink-0 w-full" data-name="Container">
      <BackgroundBorder3 />
      <BackgroundBorder4 />
    </div>
  );
}

function Svg6() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="SVG">
          <path d={svgPaths.p2aa1a600} id="Vector" stroke="var(--stroke-0, #9CA3AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Heading21() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Heading 4">
      <div className="flex flex-col font-['Inter:Black',sans-serif] font-black h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[14px] w-[313.56px]">
        <p className="leading-[20px]">Infrastructure Audit — Predictive Operations</p>
      </div>
    </div>
  );
}

function Container95() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Container">
      <Svg6 />
      <Heading21 />
    </div>
  );
}

function Container96() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[0.81px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#4b5563] text-[11px] w-full">
        <p className="leading-[17.88px]">Comprehensive review of all production applications underway. Short and long-term optimisation plans publishing next month.</p>
      </div>
    </div>
  );
}

function Background32() {
  return (
    <div className="bg-[#ffedd5] content-stretch flex items-start pb-[2px] pt-[3.1px] px-[8px] relative rounded-[2px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Black',sans-serif] font-black h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[#9a3412] text-[9px] uppercase w-[60.55px]">
        <p className="leading-[13.5px]">IN PROGRESS</p>
      </div>
    </div>
  );
}

function Item() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative" data-name="Item 3">
      <div className="content-stretch flex flex-col gap-[10.9px] items-start px-[24px] py-[10px] relative w-full">
        <Container95 />
        <Container96 />
        <Background32 />
      </div>
    </div>
  );
}

function Svg7() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="SVG">
          <path d={svgPaths.p2c7ccf00} id="Vector" stroke="var(--stroke-0, #9CA3AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Heading22() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Heading 4">
      <div className="flex flex-col font-['Inter:Black',sans-serif] font-black h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[14px] w-[351.92px]">
        <p className="leading-[20px]">Cloud Consolidation — Strategic Decision Pending</p>
      </div>
    </div>
  );
}

function Container97() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Container">
      <Svg7 />
      <Heading22 />
    </div>
  );
}

function Container98() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[0.81px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#4b5563] text-[11px] w-full">
        <p className="leading-[17.88px]">Evaluating full consolidation onto Azure. Outcome: standardised DevOps, unified governance, reduced operational complexity.</p>
      </div>
    </div>
  );
}

function Background33() {
  return (
    <div className="bg-[#e0e7ff] content-stretch flex items-start pb-[2px] pt-[3.1px] px-[8px] relative rounded-[2px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Black',sans-serif] font-black h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[#3730a3] text-[9px] uppercase w-[78.17px]">
        <p className="leading-[13.5px]">STRATEGIC EVAL</p>
      </div>
    </div>
  );
}

function Item1() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative" data-name="Item 4">
      <div className="content-stretch flex flex-col gap-[10.9px] items-start px-[24px] py-[10px] relative w-full">
        <Container97 />
        <Container98 />
        <Background33 />
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex gap-[24px] items-start relative shrink-0 w-full">
      <Item />
      <Item1 />
    </div>
  );
}

function Svg8() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="SVG">
          <path d={svgPaths.p2dc6ea00} id="Vector" stroke="var(--stroke-0, #9CA3AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Heading23() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Heading 4">
      <div className="flex flex-col font-['Inter:Black',sans-serif] font-black h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[14px] w-[301.52px]">
        <p className="leading-[20px]">{`Test Automation "UNITE" — POC Complete`}</p>
      </div>
    </div>
  );
}

function Container99() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Container">
      <Svg8 />
      <Heading23 />
    </div>
  );
}

function Container100() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[0.81px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#4b5563] text-[11px] w-full">
        <p className="leading-[17.88px]">Proactive POC demonstrates consistent regression coverage. Formal approval to commence full rollout currently awaited.</p>
      </div>
    </div>
  );
}

function BackgroundBorder5() {
  return (
    <div className="bg-[#fffbeb] content-stretch flex items-start pb-[3px] pt-[4.1px] px-[9px] relative rounded-[2px] shrink-0" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[#fde68a] border-solid inset-0 pointer-events-none rounded-[2px]" />
      <div className="flex flex-col font-['Inter:Black',sans-serif] font-black h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[#b45309] text-[9px] uppercase w-[93.14px]">
        <p className="leading-[13.5px]">APPROVAL PENDING</p>
      </div>
    </div>
  );
}

function Item2() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative" data-name="Item 5">
      <div className="content-stretch flex flex-col gap-[10.9px] items-start pl-[24px] pr-[4px] py-[10px] relative w-full">
        <Container99 />
        <Container100 />
        <BackgroundBorder5 />
      </div>
    </div>
  );
}

function Svg9() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="SVG">
          <path d={svgPaths.pb799500} id="Vector" stroke="var(--stroke-0, #9CA3AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Heading24() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Heading 4">
      <div className="flex flex-col font-['Inter:Black',sans-serif] font-black h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[14px] w-[291.44px]">
        <p className="leading-[20px]">Cloud-Native Transformation — In Design</p>
      </div>
    </div>
  );
}

function Container101() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Container">
      <Svg9 />
      <Heading24 />
    </div>
  );
}

function Container102() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[0.88px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#4b5563] text-[11px] w-full">
        <p className="leading-[17.88px]">Shaping a resilient cloud-native platform integrating DevSecOps and FinOps for greater uptime and faster delivery.</p>
      </div>
    </div>
  );
}

function Background34() {
  return (
    <div className="bg-[#ffedd5] content-stretch flex items-start pb-[2px] pt-[3px] px-[8px] relative rounded-[2px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Black',sans-serif] font-black h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[#9a3412] text-[9px] uppercase w-[45.69px]">
        <p className="leading-[13.5px]">IN DESIGN</p>
      </div>
    </div>
  );
}

function Item3() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative" data-name="Item 6">
      <div className="content-stretch flex flex-col gap-[11px] items-start pl-[24px] pr-[4px] py-[10px] relative w-full">
        <Container101 />
        <Container102 />
        <Background34 />
      </div>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex gap-[24px] items-start relative shrink-0 w-full">
      <Item2 />
      <Item3 />
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
      <Frame3 />
      <Frame4 />
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
      <Container88 />
      <Frame5 />
    </div>
  );
}

function Container87() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Frame6 />
    </div>
  );
}

function SectionModernisationInnovation() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="Section - ModernisationInnovation">
      <HorizontalBorder5 />
      <Container87 />
    </div>
  );
}

function Heading25() {
  return (
    <div className="relative shrink-0" data-name="Heading 2">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative">
        <div className="bg-[#041627] shrink-0 size-[8px]" data-name="Background" />
        <div className="flex flex-col font-['Impact:Regular',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[12px] uppercase w-[204.05px]">
          <p className="leading-[normal]">PORTFOLIO AT A GLANCE</p>
        </div>
      </div>
    </div>
  );
}

function Container103() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[#9ca3af] text-[9px] tracking-[0.9px] uppercase w-[201.94px]">
          <p className="leading-[13.5px]">5 PLATFORMS · PRODUCT ECOSYSTEM</p>
        </div>
      </div>
    </div>
  );
}

function HorizontalBorder6() {
  return (
    <div className="content-stretch flex items-center justify-between pb-[10px] relative shrink-0 w-full" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#041627] border-b-2 border-solid inset-0 pointer-events-none" />
      <Heading25 />
      <Container103 />
    </div>
  );
}

function Container105() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['Inter:Black',sans-serif] font-black justify-center leading-[0] not-italic relative shrink-0 text-[#9ca3af] text-[9px] tracking-[0.9px] uppercase w-full">
          <p className="leading-[13.5px]">FIELD VISIBILITY</p>
        </div>
      </div>
    </div>
  );
}

function Heading26() {
  return (
    <div className="relative shrink-0 w-full" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['Inter:Black',sans-serif] font-black justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[18px] uppercase w-full">
          <p className="leading-[28px]">ON-SIGHT</p>
        </div>
      </div>
    </div>
  );
}

function Container106() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#ef4444] text-[10px] w-full">
          <p className="leading-[15px]">Live view from the show floor</p>
        </div>
      </div>
    </div>
  );
}

function Container107() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[8px] relative w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[10px] w-full">
          <p className="leading-[16.25px] mb-0">Enables clients to track project progress in real time — photos, progress</p>
          <p className="leading-[16.25px]">reports, and field feedback from the floor.</p>
        </div>
      </div>
    </div>
  );
}

function Container108() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[20px] relative w-full">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#9ca3af] text-[8px] uppercase w-full">
          <p className="leading-[12px]">Angular · .NET/MS SQL · Flutter · Azure Blob</p>
        </div>
      </div>
    </div>
  );
}

function Platform() {
  return (
    <div className="bg-white col-1 justify-self-stretch relative row-1 self-start shrink-0" data-name="Platform 1">
      <div aria-hidden="true" className="absolute border border-[#f3f4f6] border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col gap-[4px] items-start p-[25px] relative w-full">
        <Container105 />
        <Heading26 />
        <Container106 />
        <Container107 />
        <Container108 />
      </div>
    </div>
  );
}

function Container109() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Black',sans-serif] font-black justify-center leading-[0] not-italic relative shrink-0 text-[#9ca3af] text-[9px] tracking-[0.9px] uppercase w-full">
        <p className="leading-[13.5px]">INTEGRATION LAYER</p>
      </div>
    </div>
  );
}

function Heading27() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 4">
      <div className="flex flex-col font-['Inter:Black',sans-serif] font-black justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-white uppercase w-full">
        <p className="leading-[28px]">MIDDLEWARE</p>
      </div>
    </div>
  );
}

function Container110() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-white w-full">
        <p className="leading-[15px]">Seamless data across the ecosystem</p>
      </div>
    </div>
  );
}

function Container111() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[8px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#d1d5db] text-[10px] w-full">
        <p className="leading-[16.25px] mb-0">Exchanges data between all platforms — the connective tissue ensuring</p>
        <p className="leading-[16.25px]">interoperability and real-time synchronisation.</p>
      </div>
    </div>
  );
}

function Container112() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[20px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[8px] uppercase w-full">
        <p className="leading-[12px]">.NET C# · SQL Server · Kafka · API Integration</p>
      </div>
    </div>
  );
}

function Platform2Highlighted() {
  return (
    <div className="bg-[#041627] col-2 justify-self-stretch relative row-1 self-start shrink-0" data-name="Platform 2 - Highlighted">
      <div className="content-stretch flex flex-col gap-[4px] items-start pb-[26px] pt-[24px] px-[24px] relative w-full">
        <div className="absolute bg-[rgba(255,255,255,0)] inset-0 shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)]" data-name="Platform 2 - Highlighted:shadow" />
        <Container109 />
        <Heading27 />
        <Container110 />
        <Container111 />
        <Container112 />
      </div>
    </div>
  );
}

function Container113() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['Inter:Black',sans-serif] font-black justify-center leading-[0] not-italic relative shrink-0 text-[#9ca3af] text-[9px] tracking-[0.9px] uppercase w-full">
          <p className="leading-[13.5px]">OPERATIONS HUB</p>
        </div>
      </div>
    </div>
  );
}

function Heading28() {
  return (
    <div className="relative shrink-0 w-full" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['Inter:Black',sans-serif] font-black justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[18px] uppercase w-full">
          <p className="leading-[28px]">SHOW-SIGHT</p>
        </div>
      </div>
    </div>
  );
}

function Container114() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#ef4444] text-[10px] w-full">
          <p className="leading-[15px]">Real-time show floor coordination</p>
        </div>
      </div>
    </div>
  );
}

function Container115() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[8px] relative w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[10px] w-full">
          <p className="leading-[16.25px] mb-0">Real-time transparency, streamlined workflows, and improved team</p>
          <p className="leading-[16.25px]">coordination across exhibitor and organiser portals.</p>
        </div>
      </div>
    </div>
  );
}

function Container116() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[20px] relative w-full">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#9ca3af] text-[8px] uppercase w-full">
          <p className="leading-[12px]">Angular · .NET/MS SQL · Flutter · Azure Blob</p>
        </div>
      </div>
    </div>
  );
}

function Platform1() {
  return (
    <div className="bg-white col-3 justify-self-stretch relative row-1 self-start shrink-0" data-name="Platform 3">
      <div aria-hidden="true" className="absolute border border-[#f3f4f6] border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col gap-[4px] items-start p-[25px] relative w-full">
        <Container113 />
        <Heading28 />
        <Container114 />
        <Container115 />
        <Container116 />
      </div>
    </div>
  );
}

function Container117() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['Inter:Black',sans-serif] font-black justify-center leading-[0] not-italic relative shrink-0 text-[#9ca3af] text-[9px] tracking-[0.9px] uppercase w-full">
          <p className="leading-[13.5px]">EVENT MANAGEMENT</p>
        </div>
      </div>
    </div>
  );
}

function Heading29() {
  return (
    <div className="relative shrink-0 w-full" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['Inter:Black',sans-serif] font-black justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[18px] uppercase w-full">
          <p className="leading-[28px]">FX-EXCHANGE</p>
        </div>
      </div>
    </div>
  );
}

function Container118() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#ef4444] text-[10px] w-full">
          <p className="leading-[15px]">End-to-end event request platform</p>
        </div>
      </div>
    </div>
  );
}

function Container119() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[8px] relative w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[10px] w-full">
          <p className="leading-[16.25px] mb-0">Handles all aspects of event requests — proof submissions, graphics,</p>
          <p className="leading-[16.25px]">work orders, and full event lifecycle.</p>
        </div>
      </div>
    </div>
  );
}

function Container120() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[20px] relative w-full">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#9ca3af] text-[8px] uppercase w-full">
          <p className="leading-[12px]">React JS(v2) · Node.js → Angular (v3)</p>
        </div>
      </div>
    </div>
  );
}

function Platform2() {
  return (
    <div className="bg-white col-1 justify-self-stretch relative row-2 self-start shrink-0" data-name="Platform 4">
      <div aria-hidden="true" className="absolute border border-[#f3f4f6] border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col gap-[4px] items-start p-[25px] relative w-full">
        <Container117 />
        <Heading29 />
        <Container118 />
        <Container119 />
        <Container120 />
      </div>
    </div>
  );
}

function Container121() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['Inter:Black',sans-serif] font-black justify-center leading-[0] not-italic relative shrink-0 text-[#9ca3af] text-[9px] tracking-[0.9px] uppercase w-full">
          <p className="leading-[13.5px]">EXHIBITOR PORTAL</p>
        </div>
      </div>
    </div>
  );
}

function Heading30() {
  return (
    <div className="relative shrink-0 w-full" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['Inter:Black',sans-serif] font-black justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[18px] uppercase w-full">
          <p className="leading-[28px]">ONE-VIEW</p>
        </div>
      </div>
    </div>
  );
}

function Container122() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#ef4444] text-[10px] w-full">
          <p className="leading-[15px]">{`Complete expo preparation & control`}</p>
        </div>
      </div>
    </div>
  );
}

function Container123() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[8px] relative w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[10px] w-full">
          <p className="leading-[16.25px] mb-0">Full visibility over ordering, task management, and event coordination in</p>
          <p className="leading-[16.25px]">one unified suite.</p>
        </div>
      </div>
    </div>
  );
}

function Container124() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[20px] relative w-full">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#9ca3af] text-[8px] uppercase w-full">
          <p className="leading-[12px]">Ruby on Rails · React JS · Kafka</p>
        </div>
      </div>
    </div>
  );
}

function Platform3() {
  return (
    <div className="bg-white col-2 justify-self-stretch relative row-2 self-start shrink-0" data-name="Platform 5">
      <div aria-hidden="true" className="absolute border border-[#f3f4f6] border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col gap-[4px] items-start p-[25px] relative w-full">
        <Container121 />
        <Heading30 />
        <Container122 />
        <Container123 />
        <Container124 />
      </div>
    </div>
  );
}

function Container104() {
  return (
    <div className="gap-x-[16px] gap-y-[16px] grid grid-cols-[repeat(3,minmax(0,1fr))] grid-rows-[__195px_195px] relative shrink-0 w-full" data-name="Container">
      <Platform />
      <Platform2Highlighted />
      <Platform1 />
      <Platform2 />
      <Platform3 />
    </div>
  );
}

function SectionPortfolioAtAGlance() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start pb-[80px] relative shrink-0 w-full" data-name="Section - PortfolioAtAGlance">
      <HorizontalBorder6 />
      <Container104 />
    </div>
  );
}

function Main() {
  return (
    <div className="max-w-[1280px] relative shrink-0 w-full" data-name="Main">
      <div className="content-stretch flex flex-col gap-[48px] items-start max-w-[inherit] px-[24px] py-[32px] relative w-full">
        <SectionClientPartners />
        <SectionMonthlySnapshot />
        <Container16 />
        <SectionBusinessImpact />
        <SectionTop3Outcomes />
        <SectionProductionSupport />
        <SectionWatchItems />
        <SectionReleaseForecast />
        <SectionModernisationInnovation />
        <SectionPortfolioAtAGlance />
      </div>
    </div>
  );
}

function Container126() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[#9ca3af] text-[9px] tracking-[0.9px] uppercase w-[446.2px]">
        <p className="leading-[13.5px]">© 2026 Nth Degree × Saksoft · Development Newsletter · VOL 01 · EDITION 01</p>
      </div>
    </div>
  );
}

function Container127() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[9px] text-white tracking-[0.9px] uppercase w-[265.42px]">
        <p className="leading-[13.5px]">Consulting · Development · Transformation</p>
      </div>
    </div>
  );
}

function Container128() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[#9ca3af] text-[9px] tracking-[0.9px] uppercase w-[153.45px]">
        <p className="leading-[13.5px]">07 Feb 2026 · Confidential</p>
      </div>
    </div>
  );
}

function Container125() {
  return (
    <div className="max-w-[1280px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center max-w-[inherit] size-full">
        <div className="content-stretch flex items-center justify-between max-w-[inherit] pr-[0.02px] relative w-full">
          <Container126 />
          <Container127 />
          <Container128 />
        </div>
      </div>
    </div>
  );
}

function MainFooter() {
  return (
    <div className="bg-[#041627] relative shrink-0 w-full" data-name="MainFooter">
      <div className="content-stretch flex flex-col items-start p-[16px] relative w-full">
        <Container125 />
      </div>
    </div>
  );
}

export default function Newsletter() {
  return (
    <div className="bg-[#f5f3ef] content-stretch flex flex-col items-start pb-[55.5px] relative size-full" data-name="Newsletter">
      <MainHeader />
      <Main />
      <MainFooter />
    </div>
  );
}
