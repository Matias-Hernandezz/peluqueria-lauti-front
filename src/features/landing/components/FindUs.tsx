import { brand } from "../../../shared/config";
import { landing } from "../data";
import { Eyebrow } from "../../../shared/components/Eyebrow";
import { Icon } from "../../../shared/components/Icon";
import { Button } from "../../../shared/components/Button";

const items: Array<{
  icon: "mapPin" | "phone" | "clock";
  label: string;
  lines: string[];
}> = [
  { icon: "mapPin", label: "Dirección", lines: brand.address.split(", ") },
  { icon: "phone", label: "Teléfono", lines: [brand.phone] },
  { icon: "clock", label: "Horarios", lines: [landing.hours] },
];

export function FindUs() {
  return (
    <section id="contact" className="border-t border-white/5 bg-white/[0.015]">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <Eyebrow>Encontranos</Eyebrow>

        <h2 className="mt-6 font-display text-4xl font-semibold tracking-wide sm:text-5xl">
          Estamos en la ciudad.
        </h2>

        <div className="mt-12 max-w-xl divide-y divide-white/5">
          {items.map((item) => (
            <div key={item.label} className="flex items-start gap-5 py-6">
              <Icon name={item.icon} className="mt-0.5 h-5 w-5 text-gold" />
              <div>
                <div className="text-[11px] uppercase tracking-[0.2em] text-white/40">
                  {item.label}
                </div>
                {item.lines.map((line) => (
                  <div key={line} className="mt-1 text-sm text-white/80">
                    {line}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <Button href={brand.mapsUrl} variant="outline">
            Abrir en Maps
          </Button>
        </div>
      </div>
    </section>
  );
}
