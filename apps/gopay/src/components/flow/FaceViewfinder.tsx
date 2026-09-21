import { CaptureNavbar } from "@/components/system/Navbar";

const A = "/figma";

/**
 * The facial-verification viewfinder: the live frame, the face-shape mask and the
 * two green alignment arcs, with the prompt pill underneath.
 */
export function FaceViewfinder({
  prompt,
  onBack,
  animateArcs = false,
}: {
  prompt: string;
  onBack?: () => void;
  animateArcs?: boolean;
}) {
  return (
    <div className="relative min-h-px w-full flex-1 overflow-hidden rounded-[32px]">
      <div className="absolute top-[21.68%] bottom-[9.71%] left-[calc(50%+0.5px)] aspect-square -translate-x-1/2">
        <img alt="" className="absolute inset-0 size-full object-cover" src={`${A}/selfie-frame.png`} />
      </div>

      <div className="absolute inset-0">
        <div className="absolute top-0 bottom-0 left-0 w-[375px]">
          <img alt="" className="absolute inset-0 block size-full" src={`${A}/viewfinder-face-shape.svg`} />
        </div>
        <div className="absolute top-0 bottom-[0.98px] left-0 w-[375px]">
          <img alt="" className="absolute inset-0 block size-full" src={`${A}/viewfinder-circle-top.svg`} />
        </div>
        <div
          className="absolute top-[242px] bottom-[242px] left-[calc(50%+0.5px)] aspect-square -translate-x-1/2"
          style={animateArcs ? { animation: "viewfinder-sweep 1.6s ease-in-out infinite" } : undefined}
        >
          <div className="absolute top-0 right-[14.76%] bottom-[79.73%] left-[14.55%]">
            <img alt="" className="block size-full" src={`${A}/viewfinder-arc-top.svg`} />
          </div>
          <div className="absolute top-[92.95%] right-[31.59%] bottom-0 left-[30.92%]">
            <img alt="" className="block size-full" src={`${A}/viewfinder-arc-bottom.svg`} />
          </div>
        </div>
      </div>

      <div className="absolute inset-0 flex flex-col items-start">
        <div className="flex min-h-px w-full flex-1 flex-col items-start">
          <div className="flex h-[64px] w-full flex-col items-start py-[8px]">
            <CaptureNavbar onBack={onBack} />
          </div>
          <div className="flex min-h-px w-full flex-1 flex-col items-center gap-[12px] py-[64px]">
            <div className="flex w-full flex-col items-start px-[16px]">
              <p className="w-full text-center text-[18px] leading-[24px] font-bold text-[#1d1d1d]">
                Fit your face in the photo area
              </p>
            </div>
            <div className="h-[398px] w-full shrink-0" />
            <div className="flex w-full flex-col items-start px-[16px]">
              <div className="flex w-full items-center gap-[16px] overflow-hidden rounded-[20px] bg-[#1e2125] p-[16px]">
                <span className="flex size-[24px] shrink-0 items-center justify-center">
                  <img alt="" className="block size-full" src={`${A}/ic-face-id.svg`} />
                </span>
                <p className="min-w-px flex-1 text-[14px] leading-[20px] font-bold text-white">
                  {prompt}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
