import { brand } from "../../../shared/config";
import { Eyebrow } from "../../../shared/components/Eyebrow";
import { Icon } from "../../../shared/components/Icon";
import { Button } from "../../../shared/components/Button";
import { Skeleton } from "../../../shared/components/Skeleton";
import { useLandingHours } from "../hooks/useLanding";
import { formatSchedule } from "../lib/formatSchedule";

interface InfoItem {
  icon: "mapPin" | "phone";
  label: string;
  lines: string[];
}

const contactItems: InfoItem[] = [
  { icon: "mapPin", label: "Dirección", lines: brand.address.split(", ") },
  { icon: "phone", label: "Teléfono", lines: [brand.phone] },
];

export function FindUs() {
  const { hours, isLoading } = useLandingHours();

  return (
    <section id="contact" className="scroll-mt-24 border-t border-white/5 bg-white/[0.015]">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <Eyebrow>Encontranos</Eyebrow>

        <h2 className="mt-6 font-display text-4xl font-semibold tracking-wide sm:text-5xl">
          Estamos para atenderte.
        </h2>

        <div className="mt-12 max-w-xl divide-y divide-white/5">
          {contactItems.map((item) => (
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

          <div className="flex items-start gap-5 py-6">
            <Icon name="clock" className="mt-0.5 h-5 w-5 text-gold" />
            <div>
              <div className="text-[11px] uppercase tracking-[0.2em] text-white/40">
                Horarios
              </div>
              {isLoading ? (
                <div className="mt-2 space-y-2">
                  <Skeleton className="h-3 w-48" />
                  <Skeleton className="h-3 w-32" />
                </div>
              ) : (
                formatSchedule(hours)
                  .split(" · ")
                  .map((line) => (
                    <div key={line} className="mt-1 text-sm text-white/80">
                      {line}
                    </div>
                  ))
              )}
            </div>
          </div>
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
