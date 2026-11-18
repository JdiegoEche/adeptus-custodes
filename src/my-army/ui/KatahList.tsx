import { Fragment } from "react";
import { Badge } from "../../shared/components/Badge";
import { Card, Field } from "../../shared/components/Section";
import { PHASE_LABELS, TURN_LABELS } from "../../shared/i18n/dictionary";
import { useLanguage } from "../../shared/i18n/LanguageContext";
import { GroupTags } from "./GroupTags";
import type { Detachment, Katah, KatahId } from "../../shared/types";

export function KatahList({
  katahs,
  hint,
  favouredBy,
  chosen,
}: {
  katahs: readonly Katah[];
  hint: string;
  favouredBy: (katahId: KatahId) => Detachment[];
  chosen?: {
    isChosen: (id: KatahId) => boolean;
    onToggle: (id: KatahId) => void;
  };
}) {
  const { t, tx } = useLanguage();

  return (
    <>
      <p className="mb-2 text-sm text-parchment/70">{hint}</p>
      <ul className="space-y-2">
        {katahs.map((katah, index) => {
          const startsPhase =
            chosen && katah.timing.phase !== katahs[index - 1]?.timing.phase;
          const favoured = favouredBy(katah.id);
          return (
            <Fragment key={katah.id}>
              {startsPhase && (
                <li
                  aria-hidden="true"
                  className="pt-2 text-xs font-semibold uppercase tracking-wider text-gold-600"
                >
                  {tx(PHASE_LABELS[katah.timing.phase])}
                </li>
              )}
              <li
                data-katah={katah.id}
                data-favoured={favoured.length > 0 || undefined}
                className={chosen ? "cursor-pointer" : undefined}
                onClick={
                  chosen
                    ? (event) => {
                        // The checkbox/label already toggle natively.
                        if ((event.target as HTMLElement).closest("label")) return;
                        chosen.onToggle(katah.id);
                      }
                    : undefined
                }
              >
                <Card
                  highlighted={
                    chosen ? chosen.isChosen(katah.id) : favoured.length > 0
                  }
                >
                  {chosen && (
                    <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gold-300">
                      <input
                        type="checkbox"
                        checked={chosen.isChosen(katah.id)}
                        onChange={() => chosen.onToggle(katah.id)}
                        aria-label={`${t("battle.chosen")}: ${katah.name}`}
                        className="h-5 w-5 shrink-0 accent-[var(--color-gold-500)]"
                      />
                      <span aria-hidden="true">{t("battle.chosen")}</span>
                    </label>
                  )}
                  <h3 className="flex flex-wrap items-center gap-2 font-display font-bold text-gold-300">
                    {katah.name}
                    <Badge>
                      {tx(PHASE_LABELS[katah.timing.phase])} ·{" "}
                      {tx(TURN_LABELS[katah.timing.turn])}
                    </Badge>
                    {favoured.map((detachment) => (
                      <Badge key={detachment.id} tone="gold">
                        {t("army.favouredBy", { name: detachment.name })}
                      </Badge>
                    ))}
                  </h3>
                  <dl>
                    <Field label={t("common.when")}>{tx(katah.when)}</Field>
                    <Field label={t("common.effect")}>{tx(katah.effect)}</Field>
                    {favoured.map((detachment) =>
                      detachment.favouredKatah ? (
                        <Field
                          key={detachment.id}
                          label={`${t("army.extraEffect")} (${detachment.name})`}
                        >
                          <span className="font-semibold text-gold-300">
                            {tx(detachment.favouredKatah.extraEffect)}
                          </span>
                        </Field>
                      ) : null,
                    )}
                  </dl>
                  <div className="mt-2">
                    <GroupTags groups={katah.groups} />
                  </div>
                </Card>
              </li>
            </Fragment>
          );
        })}
      </ul>
    </>
  );
}
