import { useState, useRef } from "react";

/* =========================================================
   DATA
========================================================= */

const EMPLOYMENT_TYPES = [
  "Salaried – Private Sector",
  "Salaried – Government / PSU",
  "Self-Employed – Business",
  "Self-Employed – Professional",
  "Freelancer / Consultant",
];

type UploadStatus = "idle" | "uploading" | "done";

interface DocState {
  status: UploadStatus;
  fileName: string;
}

/* =========================================================
   SHARED COMPONENTS
========================================================= */

function StatusBar() {
  return (
    <div className="flex items-center justify-between px-8 pt-[14px] pb-1 bg-[#0f2358] relative">
      <span className="text-white text-[13px] font-semibold">9:41</span>

      <div
        style={{
          width: 120,
          height: 30,
          background: "#1a1a2e",
          borderRadius: 20,
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          top: 8,
        }}
      />

      <div className="flex items-center gap-1.5">
        <svg width="16" height="12" viewBox="0 0 16 12" fill="white">
          <rect x="0" y="4" width="3" height="8" rx="0.5" opacity="0.4" />
          <rect x="4.5" y="2.5" width="3" height="9.5" rx="0.5" opacity="0.6" />
          <rect x="9" y="0.5" width="3" height="11.5" rx="0.5" opacity="0.8" />
          <rect x="13.5" y="0" width="2.5" height="12" rx="0.5" />
        </svg>

        <svg width="16" height="12" viewBox="0 0 24 17" fill="white">
          <path d="M12 3.5C8.7 3.5 5.7 4.8 3.5 7L5 8.5C6.8 6.7 9.3 5.5 12 5.5s5.2 1.2 7 3L20.5 7C18.3 4.8 15.3 3.5 12 3.5z" />
          <path d="M12 7c-2.2 0-4.2.9-5.7 2.3L7.7 10.8C8.9 9.7 10.4 9 12 9s3.1.7 4.3 1.8l1.4-1.5C16.2 7.9 14.2 7 12 7z" />
          <circle cx="12" cy="14" r="2.5" />
        </svg>

        <div
          style={{
            width: 22,
            height: 11,
            border: "1.5px solid white",
            borderRadius: 3,
            padding: "1.5px 2px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: 13,
              height: 6,
              background: "white",
              borderRadius: 1.5,
            }}
          />
        </div>
      </div>
    </div>
  );
}

interface AppHeaderProps {
  step: number;
  stepLabel: string;
  title: string;
  subtitle: string;
  onBack?: () => void;
}

function AppHeader({
  step,
  stepLabel,
  title,
  subtitle,
  onBack,
}: AppHeaderProps) {
  return (
    <div
      className="px-6 pt-5 pb-6"
      style={{
        background:
          "linear-gradient(150deg, #0f2358 0%, #1a3a7e 60%, #1e4494 100%)",
      }}
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          {onBack && (
            <button
              onClick={onBack}
              className="flex items-center justify-center mr-1"
              style={{
                width: 32,
                height: 32,
                background: "rgba(255,255,255,0.12)",
                borderRadius: 10,
                border: "1px solid rgba(255,255,255,0.18)",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M15 18l-6-6 6-6"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}

          <div
            className="flex items-center justify-center"
            style={{
              width: 32,
              height: 32,
              background: "rgba(255,255,255,0.15)",
              borderRadius: 8,
              border: "1px solid rgba(255,255,255,0.2)",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2L4 7v5c0 5.5 3.5 10.7 8 12 4.5-1.3 8-6.5 8-12V7L12 2z"
                fill="rgba(255,255,255,0.9)"
              />
              <path
                d="M9 12l2 2.5 4-4"
                stroke="#1a3a7e"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div>
            <p className="text-white font-bold text-[15px] leading-none">
              LoanEase
            </p>
            <p className="text-blue-200 text-[10px] mt-0.5 font-medium">
              Instant Personal Loans
            </p>
          </div>
        </div>

        <div
          className="text-[11px] font-semibold px-3 py-1 rounded-full"
          style={{
            background: "rgba(255,255,255,0.15)",
            color: "#93c5fd",
            border: "1px solid rgba(255,255,255,0.15)",
          }}
        >
          Help
        </div>
      </div>

      <h1 className="text-white font-bold text-[22px] leading-snug mb-1 whitespace-pre-line">
        {title}
      </h1>

      <p className="text-blue-200 text-[13px]">{subtitle}</p>

      <div className="mt-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-white text-[12px] font-semibold">
            Step {step} of 3
          </span>
          <span className="text-blue-200 text-[11px]">{stepLabel}</span>
        </div>

        <div className="flex gap-1.5">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className="flex-1 rounded-full"
              style={{
                height: 4,
                background:
                  s <= step ? "#ffffff" : "rgba(255,255,255,0.25)",
              }}
            />
          ))}
        </div>

        <div className="flex justify-between mt-2">
          {["Personal", "Documents", "Review"].map((label, i) => (
            <span
              key={label}
              className="text-[10px] font-medium"
              style={{
                color: i < step ? "#ffffff" : "rgba(255,255,255,0.4)",
              }}
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function FooterBadges() {
  return (
    <div className="flex items-center justify-center gap-3 mt-3">
      {["PCI DSS", "ISO 27001", "RBI NBFC"].map((badge, i) => (
        <div key={badge} className="flex items-center gap-1">
          {i > 0 && <div className="w-px h-3 bg-gray-200" />}
          <span className="text-[10px] font-semibold text-[#6b7280] tracking-wider">
            {badge}
          </span>
        </div>
      ))}
    </div>
  );
}

function LockIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
      <rect x="5" y="11" width="14" height="10" rx="2" fill="#6b7280" />
      <path
        d="M8 11V7a4 4 0 0 1 8 0v4"
        stroke="#6b7280"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2L4 6v6c0 5.25 3.5 10.15 8 11.35C16.5 22.15 20 17.25 20 12V6L12 2z"
        fill="#1e3a6e"
        fillOpacity="0.15"
        stroke="#1e3a6e"
        strokeWidth="1.5"
      />
      <path
        d="M9 12l2 2 4-4"
        stroke="#1e3a6e"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface FieldProps {
  label: string;
  hint?: string;
  children: React.ReactNode;
}

function Field({ label, hint, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[13px] font-semibold text-[#1a2744] tracking-wide uppercase">
        {label}
      </label>
      {children}
      {hint && (
        <p className="text-[11.5px] text-[#6b7280] flex items-center gap-1">
          <LockIcon />
          {hint}
        </p>
      )}
    </div>
  );
}

/* =========================================================
   SCREEN 1 — PERSONAL DETAILS
========================================================= */

function Screen1({ onNext }: { onNext: () => void }) {
  const [form, setForm] = useState({
    fullName: "",
    mobile: "",
    dob: "",
    employment: "",
    income: "",
  });

  const [trustOpen, setTrustOpen] = useState(false);

  const set = (key: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const allFilled =
    form.fullName.trim().length >= 2 &&
    form.mobile.length === 10 &&
    form.dob.length > 0 &&
    form.employment.length > 0 &&
    form.income.length > 0;

  return (
    <>
      <AppHeader
        step={1}
        stepLabel="Personal Details"
        title={"Personal Loan\nApplication"}
        subtitle="Quick approval · No branch visit needed"
      />

      <div
        className="flex-1 overflow-y-auto"
        style={{ background: "#f7f8fb" }}
      >
        <div className="px-5 pt-5 pb-6 flex flex-col gap-4">

          <Field label="Full Name" hint="As per PAN / Aadhaar card">
            <input
              type="text"
              value={form.fullName}
              onChange={set("fullName")}
              placeholder="Priya Sharma"
              className="w-full bg-white text-[15px] rounded-[14px] px-4 py-3.5"
              style={{
                border:
                  form.fullName.length >= 2
                    ? "1.5px solid #1a3a7e"
                    : "1.5px solid #e2e6f0",
              }}
            />
          </Field>

          <Field label="Mobile Number" hint="OTP will be sent to verify">
            <div className="flex gap-2">
              <div
                className="flex items-center gap-1.5 px-3 bg-white rounded-[14px]"
                style={{ border: "1.5px solid #e2e6f0" }}
              >
                <span>🇮🇳</span>
                <span className="text-[14px] font-semibold">+91</span>
              </div>

              <input
                type="tel"
                maxLength={10}
                value={form.mobile}
                onChange={set("mobile")}
                placeholder="98765 43210"
                className="flex-1 bg-white text-[15px] rounded-[14px] px-4 py-3.5"
                style={{
                  border:
                    form.mobile.length === 10
                      ? "1.5px solid #1a3a7e"
                      : "1.5px solid #e2e6f0",
                }}
              />
            </div>
          </Field>

          <Field label="Date of Birth" hint="Must be 21–58 years for eligibility">
            <input
              type="date"
              value={form.dob}
              onChange={set("dob")}
              className="w-full bg-white text-[15px] rounded-[14px] px-4 py-3.5"
              style={{ border: "1.5px solid #e2e6f0" }}
            />
          </Field>

          <Field label="Employment Type">
            <select
              value={form.employment}
              onChange={set("employment")}
              className="w-full bg-white text-[15px] rounded-[14px] px-4 py-3.5"
              style={{ border: "1.5px solid #e2e6f0" }}
            >
              <option value="">Select employment type</option>
              {EMPLOYMENT_TYPES.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </Field>

          <Field label="Monthly Income" hint="Net take-home after taxes & deductions">
            <input
              type="number"
              value={form.income}
              onChange={set("income")}
              placeholder="45,000"
              className="w-full bg-white text-[15px] rounded-[14px] px-4 py-3.5"
              style={{ border: "1.5px solid #e2e6f0" }}
            />
          </Field>

          <div
            className="rounded-[16px] overflow-hidden"
            style={{
              border: "1.5px solid #dce4f5",
              background: "linear-gradient(135deg,#f0f5ff,#eef2ff)",
            }}
          >
            <button
              onClick={() => setTrustOpen(!trustOpen)}
              className="w-full flex items-center gap-3 px-4 py-4 text-left"
            >
              <ShieldIcon />

              <div className="flex-1">
                <p className="text-[13px] font-semibold text-[#1a2744]">
                  Why do we need this information?
                </p>
                <p className="text-[11.5px] text-[#4b5a80]">
                  Your data is encrypted & protected
                </p>
              </div>

              <span className="text-[#4b5a80]">
                {trustOpen ? "⌃" : "⌄"}
              </span>
            </button>

            {trustOpen && (
              <div className="px-4 pb-4">
                <p className="text-[11.5px] text-[#4b5a80] leading-relaxed">
                  Your identity, employment and income information help us
                  assess your application securely and transparently.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="px-5 pt-4 pb-8 bg-white">
        <button
          onClick={allFilled ? onNext : undefined}
          disabled={!allFilled}
          className="w-full py-4 rounded-[16px] text-[16px] font-bold"
          style={{
            background: allFilled ? "#123b82" : "#d1d5db",
            color: allFilled ? "white" : "#9ca3af",
          }}
        >
          Continue →
        </button>
        <FooterBadges />
      </div>
    </>
  );
}

/* =========================================================
   SCREEN 2 — DOCUMENTS & KYC
========================================================= */

const DOCS = [
  ["pan", "PAN Card", "JPG, PNG or PDF · Max 5 MB"],
  ["aadhaar", "Aadhaar / Identity Proof", "Aadhaar, Passport or Voter ID"],
  ["salary", "Salary Slip / Bank Statement", "Last 3 months · PDF preferred"],
];

function Screen2({
  onBack,
  onNext,
}: {
  onBack: () => void;
  onNext: () => void;
}) {
  const [docs, setDocs] = useState<Record<string, DocState>>(
    Object.fromEntries(
      DOCS.map(([key]) => [
        key,
        { status: "idle", fileName: "" },
      ])
    )
  );

  const upload = (key: string) => (file: File) => {
    setDocs((d) => ({
      ...d,
      [key]: { status: "uploading", fileName: file.name },
    }));

    setTimeout(() => {
      setDocs((d) => ({
        ...d,
        [key]: { status: "done", fileName: file.name },
      }));
    }, 700);
  };

  const doneCount = Object.values(docs).filter(
    (d) => d.status === "done"
  ).length;

  const allDone = doneCount === 3;

  return (
    <>
      <AppHeader
        step={2}
        stepLabel="KYC Documents"
        title="Documents & KYC"
        subtitle="Securely upload the documents needed to verify your application."
        onBack={onBack}
      />

      <div
        className="flex-1 overflow-y-auto"
        style={{ background: "#f7f8fb" }}
      >
        <div className="px-5 pt-5 pb-6 flex flex-col gap-4">
          {DOCS.map(([key, title, hint]) => (
            <DocumentCard
              key={key}
              title={title}
              hint={hint}
              doc={docs[key]}
              onUpload={upload(key)}
              onRemove={() =>
                setDocs((d) => ({
                  ...d,
                  [key]: { status: "idle", fileName: "" },
                }))
              }
            />
          ))}

          <div
            className="rounded-[18px] px-4 py-4"
            style={{
              background: "linear-gradient(135deg,#f0f5ff,#eef2ff)",
              border: "1.5px solid #dce4f5",
            }}
          >
            <p className="text-[13px] font-bold text-[#1a2744] mb-1">
              Why do we need these documents?
            </p>
            <p className="text-[12px] text-[#4b5a80] leading-relaxed">
              These documents help verify your identity and income. They are
              securely handled and used only for application verification.
            </p>
            <p className="text-[11px] font-semibold text-[#4b5a80] mt-2">
              🔒 256-bit encryption · Secure verification
            </p>
          </div>
        </div>
      </div>

      <div className="px-5 pt-4 pb-8 bg-white">
        {!allDone && (
          <p className="text-[11.5px] text-gray-500 text-center mb-3">
            {doneCount} of 3 documents uploaded
          </p>
        )}

        <button
          onClick={allDone ? onNext : undefined}
          disabled={!allDone}
          className="w-full py-4 rounded-[16px] text-[16px] font-bold"
          style={{
            background: allDone ? "#123b82" : "#d1d5db",
            color: allDone ? "white" : "#9ca3af",
          }}
        >
          Continue →
        </button>

        <FooterBadges />
      </div>
    </>
  );
}

function DocumentCard({
  title,
  hint,
  doc,
  onUpload,
  onRemove,
}: {
  title: string;
  hint: string;
  doc: DocState;
  onUpload: (f: File) => void;
  onRemove: () => void;
}) {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <div
      className="bg-white rounded-[18px] px-4 py-4"
      style={{
        border: "1.5px solid #e4e8f2",
        boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
      }}
    >
      <div className="flex items-center gap-3">
        <div
          className="flex items-center justify-center rounded-[13px]"
          style={{
            width: 44,
            height: 44,
            background: "#f2f4fb",
          }}
        >
          📄
        </div>

        <div className="flex-1">
          <p className="text-[14px] font-bold text-[#1a2744]">{title}</p>
          <span className="text-[10px] font-bold text-red-500 uppercase">
            Required
          </span>
        </div>

        {doc.status === "done" && (
          <span className="text-green-500 text-xl">✓</span>
        )}
      </div>

      <div className="mt-3">
        {doc.status === "idle" && (
          <button
            onClick={() => ref.current?.click()}
            className="w-full py-3 rounded-[13px] font-semibold text-[13px]"
            style={{
              border: "1.5px dashed #b3c2e0",
              background: "#f6f8fd",
              color: "#1a3a7e",
            }}
          >
            ↑ Upload document
          </button>
        )}

        {doc.status === "uploading" && (
          <div className="text-center py-3 text-[12px] text-[#4b5a80]">
            Uploading…
          </div>
        )}

        {doc.status === "done" && (
          <div
            className="flex items-center gap-2 px-3 py-2.5 rounded-[12px]"
            style={{
              background: "#f0fdf4",
              border: "1px solid #bbf7d0",
            }}
          >
            <span className="text-green-600">✓</span>
            <span className="flex-1 text-[12px] font-semibold text-green-700 truncate">
              {doc.fileName}
            </span>
            <button onClick={onRemove} className="text-gray-400">
              ×
            </button>
          </div>
        )}
      </div>

      <p className="text-[11px] text-gray-400 mt-2">{hint}</p>

      <input
        ref={ref}
        type="file"
        accept=".pdf,.jpg,.jpeg,.png"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onUpload(file);
        }}
      />
    </div>
  );
}

/* =========================================================
   SCREEN 3 — REVIEW + SUBMITTED
========================================================= */

function ReviewRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div
      className="flex justify-between py-2.5"
      style={{ borderBottom: "1px solid #f0f2f8" }}
    >
      <span className="text-[12px] text-gray-500">{label}</span>
      <span className="text-[13px] font-semibold text-[#1a2744] text-right">
        {value}
      </span>
    </div>
  );
}

function ReviewSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="bg-white rounded-[18px] overflow-hidden"
      style={{ border: "1.5px solid #e4e8f2" }}
    >
      <div
        className="px-4 pt-4 pb-3"
        style={{ borderBottom: "1px solid #f0f2f8" }}
      >
        <span className="text-[12px] font-bold text-[#1a2744] uppercase tracking-wider">
          {title}
        </span>
      </div>

      <div className="px-4">{children}</div>
    </div>
  );
}

function Screen3({
  onBack,
  onSubmitted,
}: {
  onBack: () => void;
  onSubmitted: () => void;
}) {
  const [consented, setConsented] = useState(false);

  return (
    <>
      <AppHeader
        step={3}
        stepLabel="Review"
        title="Review Application"
        subtitle="Check your details before submitting."
        onBack={onBack}
      />

      <div
        className="flex-1 overflow-y-auto"
        style={{ background: "#f7f8fb" }}
      >
        <div className="px-5 pt-5 pb-6 flex flex-col gap-4">

          <ReviewSection title="Personal Details">
            <ReviewRow label="Name" value="Rahul Sharma" />
            <ReviewRow label="Mobile" value="+91 98765 43210" />
            <ReviewRow label="Date of birth" value="23 Oct 2004" />
            <ReviewRow
              label="Employment"
              value="Salaried – Private Sector"
            />
            <ReviewRow label="Monthly income" value="₹75,000" />
          </ReviewSection>

          <ReviewSection title="Loan Details">
            <ReviewRow label="Loan amount" value="₹3,00,000" />
            <ReviewRow label="Tenure" value="24 months" />
            <ReviewRow label="Estimated EMI" value="₹14,545 / month" />
            <ReviewRow label="Interest rate" value="14% p.a." />
          </ReviewSection>

          <ReviewSection title="Documents">
            <ReviewRow label="PAN Card" value="✓ Uploaded" />
            <ReviewRow label="Identity Proof" value="✓ Uploaded" />
            <ReviewRow label="Salary Slip" value="✓ Uploaded" />
          </ReviewSection>

          <div
            className="rounded-[18px] px-4 py-4"
            style={{
              background: "#fffbeb",
              border: "1.5px solid #fde68a",
            }}
          >
            <p className="text-[13px] font-bold text-[#92400e] mb-1">
              Before you submit
            </p>

            <p className="text-[12px] text-[#78350f] leading-relaxed">
              Your final loan offer and interest rate will be confirmed after
              verification. This application does not guarantee loan approval.
            </p>
          </div>

          <button
            onClick={() => setConsented(!consented)}
            className="flex items-start gap-3 text-left"
          >
            <div
              className="w-5 h-5 rounded-[6px] flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{
                background: consented ? "#1a3a7e" : "white",
                border: "2px solid #b0bbd4",
              }}
            >
              {consented && (
                <span className="text-white text-xs">✓</span>
              )}
            </div>

            <p className="text-[12px] text-[#4b5a80] leading-relaxed">
              I confirm that the information provided is accurate and I agree
              to the Terms & Conditions and Privacy Policy.
            </p>
          </button>
        </div>
      </div>

      <div className="px-5 pt-4 pb-8 bg-white">
        <button
          onClick={consented ? onSubmitted : undefined}
          disabled={!consented}
          className="w-full py-4 rounded-[16px] text-[16px] font-bold"
          style={{
            background: consented ? "#123b82" : "#d1d5db",
            color: consented ? "white" : "#9ca3af",
          }}
        >
          Submit Application →
        </button>

        <FooterBadges />
      </div>
    </>
  );
}

/* =========================================================
   SCREEN 8 — APPLICATION SUBMITTED
========================================================= */

function SubmittedScreen({ onNext }: { onNext: () => void }) {
  return (
    <>
      <AppHeader
        step={3}
        stepLabel="Review"
        title="Application Submitted"
        subtitle="We have received your application."
      />

      <div
        className="flex-1 overflow-y-auto"
        style={{ background: "#f7f8fb" }}
      >
        <div className="px-6 py-10 flex flex-col items-center text-center gap-5">

          <div
            className="flex items-center justify-center rounded-full"
            style={{
              width: 82,
              height: 82,
              background: "#f0fdf4",
              border: "2px solid #bbf7d0",
            }}
          >
            <div
              className="flex items-center justify-center rounded-full"
              style={{
                width: 48,
                height: 48,
                background: "#22c55e",
              }}
            >
              <span className="text-white text-3xl">✓</span>
            </div>
          </div>

          <div>
            <p className="text-[21px] font-bold text-[#1a2744]">
              Application Submitted!
            </p>

            <p className="text-[13px] text-[#4b5a80] leading-relaxed mt-2">
              Your application has been received. We'll keep you updated as
              your application moves through verification.
            </p>
          </div>

          <div
            className="w-full rounded-[16px] px-4 py-4 flex flex-col gap-2 text-left"
            style={{
              background: "#f0f5ff",
              border: "1.5px solid #dce4f5",
            }}
          >
            <div className="flex justify-between">
              <span className="text-[12px] text-gray-500">
                Application ID
              </span>
              <span className="text-[12px] font-bold">
                LE-2024-98741
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-[12px] text-gray-500">
                Loan Amount
              </span>
              <span className="text-[12px] font-bold">
                ₹3,00,000
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-[12px] text-gray-500">
                Status
              </span>
              <span className="text-[12px] font-bold text-green-600">
                Under Review
              </span>
            </div>
          </div>

          <button
            onClick={onNext}
            className="w-full py-4 rounded-[16px] text-white font-bold"
            style={{ background: "#123b82" }}
          >
            Track Application →
          </button>
        </div>
      </div>

      <div className="px-5 pt-4 pb-8 bg-white">
        <FooterBadges />
      </div>
    </>
  );
}

/* =========================================================
   SCREEN 9 — APPLICATION TRACKER
========================================================= */

function Screen9({
  onBack,
  onAI,
}: {
  onBack: () => void;
  onAI: () => void;
}) {
  return (
    <>
      <div
        className="px-6 pt-5 pb-6"
        style={{
          background:
            "linear-gradient(150deg,#0f2358,#1a3a7e,#1e4494)",
        }}
      >
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="w-8 h-8 rounded-[10px] text-white"
            style={{ background: "rgba(255,255,255,.12)" }}
          >
            ←
          </button>

          <span className="text-white font-bold text-[15px]">
            LoanEase
          </span>

          <span className="text-blue-200 text-[11px]">
            Help
          </span>
        </div>

        <h1 className="text-white text-[22px] font-bold mt-6">
          Track your application
        </h1>

        <p className="text-blue-200 text-[12px] mt-1">
          Application ID: LE-2024-98741
        </p>
      </div>

      <div
        className="flex-1 overflow-y-auto"
        style={{ background: "#f7f8fb" }}
      >
        <div className="px-5 py-5 flex flex-col gap-4">

          <div
            className="rounded-[18px] p-5"
            style={{
              background: "white",
              border: "1.5px solid #dce4f5",
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center"
                style={{ background: "#eef2ff" }}
              >
                🔍
              </div>

              <div>
                <p className="text-[16px] font-bold text-[#1a2744]">
                  Application under review
                </p>

                <p className="text-[12px] text-[#6b7280] mt-1">
                  We're verifying your details.
                </p>
              </div>
            </div>
          </div>

          <div
            className="bg-white rounded-[18px] p-5"
            style={{ border: "1.5px solid #e4e8f2" }}
          >
            <p className="text-[13px] font-bold text-[#1a2744] mb-5">
              Application progress
            </p>

            <TrackerStep
              done
              title="Application submitted"
              desc="Your application was received"
            />

            <TrackerStep
              done
              title="Documents received"
              desc="All required documents uploaded"
            />

            <TrackerStep
              active
              title="Verification in progress"
              desc="We're checking your application details"
            />

            <TrackerStep
              title="Loan decision"
              desc="You'll be notified once a decision is made"
            />
          </div>

          <div
            className="rounded-[18px] p-4"
            style={{
              background: "linear-gradient(135deg,#f0f5ff,#eef2ff)",
              border: "1.5px solid #dce4f5",
            }}
          >
            <div className="flex gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: "#dce6ff" }}
              >
                ✦
              </div>

              <div className="flex-1">
                <p className="text-[13px] font-bold text-[#1a2744]">
                  Loan Guide
                </p>

                <p className="text-[12px] text-[#4b5a80] mt-1 leading-relaxed">
                  Want to know what happens during verification?
                </p>

                <button
                  onClick={onAI}
                  className="text-[12px] font-bold text-[#1a3a7e] mt-2"
                >
                  Ask Loan Guide →
                </button>
              </div>
            </div>
          </div>

          <button
            className="w-full py-3.5 rounded-[14px] font-semibold text-[#1a3a7e]"
            style={{
              background: "white",
              border: "1.5px solid #dce4f5",
            }}
          >
            Back to Home
          </button>
        </div>
      </div>
    </>
  );
}

function TrackerStep({
  done,
  active,
  title,
  desc,
}: {
  done?: boolean;
  active?: boolean;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex gap-3 min-h-[72px]">
      <div className="flex flex-col items-center">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-sm"
          style={{
            background: done
              ? "#22c55e"
              : active
              ? "#1a3a7e"
              : "#e5e7eb",
            color: done || active ? "white" : "#9ca3af",
          }}
        >
          {done ? "✓" : active ? "•" : "○"}
        </div>

        <div
          className="w-[2px] flex-1 mt-1"
          style={{
            background: done ? "#bbf7d0" : "#e5e7eb",
          }}
        />
      </div>

      <div className="pb-5">
        <p
          className="text-[13px] font-bold"
          style={{
            color: active ? "#1a3a7e" : "#1a2744",
          }}
        >
          {title}
        </p>

        <p className="text-[11.5px] text-gray-500 mt-1">
          {desc}
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   SCREEN 10 — AI LOAN GUIDE
========================================================= */

function Screen10({ onBack }: { onBack: () => void }) {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<
    { from: "ai" | "user"; text: string }[]
  >([
    {
      from: "ai",
      text:
        "Hi Rahul. I'm Loan Guide. I can explain your application status, loan terms and what happens next. I won't make lending decisions.",
    },
  ]);

  const ask = (text: string) => {
    setQuestion(text);

    const answer =
      text.includes("verification")
        ? "Verification usually checks your identity, income and submitted documents. If something needs clarification, the lending team may contact you."
        : text.includes("approval")
        ? "Your application is currently under review. I can explain the process, but I cannot predict or guarantee the final lending decision."
        : "Your application is currently under review. I'll help explain the process and terminology without making decisions on your behalf.";

    setMessages((m) => [
      ...m,
      { from: "user", text },
      { from: "ai", text: answer },
    ]);
  };

  return (
    <>
      <div
        className="px-6 pt-5 pb-6"
        style={{
          background:
            "linear-gradient(150deg,#0f2358,#1a3a7e,#1e4494)",
        }}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="w-8 h-8 rounded-[10px] text-white"
            style={{ background: "rgba(255,255,255,.12)" }}
          >
            ←
          </button>

          <div>
            <p className="text-white font-bold text-[17px]">
              Loan Guide
            </p>

            <p className="text-blue-200 text-[10px]">
              AI assistant · Always explainable
            </p>
          </div>

          <span
            className="ml-auto text-[10px] font-bold px-2.5 py-1 rounded-full"
            style={{
              color: "#dbeafe",
              background: "rgba(255,255,255,.12)",
            }}
          >
            AI
          </span>
        </div>
      </div>

      <div
        className="flex-1 overflow-y-auto"
        style={{ background: "#f7f8fb" }}
      >
        <div className="px-5 py-5 flex flex-col gap-4">

          <div
            className="rounded-[16px] p-4"
            style={{
              background: "#eef4ff",
              border: "1.5px solid #dce4f5",
            }}
          >
            <p className="text-[12px] text-[#4b5a80] leading-relaxed">
              Loan Guide explains your options and application status.
              <strong> It does not approve or reject loans.</strong>
            </p>
          </div>

          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex ${
                m.from === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className="max-w-[82%] rounded-[16px] px-4 py-3"
                style={{
                  background:
                    m.from === "user" ? "#1a3a7e" : "white",
                  color:
                    m.from === "user" ? "white" : "#34415f",
                  border:
                    m.from === "ai"
                      ? "1px solid #e4e8f2"
                      : "none",
                }}
              >
                <p className="text-[12.5px] leading-relaxed">
                  {m.text}
                </p>
              </div>
            </div>
          ))}

          <p className="text-[11px] font-semibold text-gray-500 mt-2">
            Quick questions
          </p>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() =>
                ask("What happens during verification?")
              }
              className="px-3 py-2 rounded-full text-[11.5px] font-semibold text-[#1a3a7e]"
              style={{
                background: "white",
                border: "1px solid #dce4f5",
              }}
            >
              What happens during verification?
            </button>

            <button
              onClick={() =>
                ask("Can you tell me if my loan will be approved?")
              }
              className="px-3 py-2 rounded-full text-[11.5px] font-semibold text-[#1a3a7e]"
              style={{
                background: "white",
                border: "1px solid #dce4f5",
              }}
            >
              Will my loan be approved?
            </button>
          </div>

          <div className="mt-2">
            <input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && question.trim()) {
                  ask(question.trim());
                }
              }}
              placeholder="Ask Loan Guide anything..."
              className="w-full bg-white rounded-[14px] px-4 py-3.5 text-[13px]"
              style={{
                border: "1.5px solid #dce4f5",
              }}
            />
          </div>

          <div
            className="rounded-[14px] px-3 py-3"
            style={{
              background: "#fff",
              border: "1px solid #e4e8f2",
            }}
          >
            <p className="text-[10.5px] text-gray-500 leading-relaxed">
              <strong>Human oversight:</strong> For decisions, disputes or
              complex financial questions, you can request assistance from a
              human representative.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

/* =========================================================
   ROOT APP
========================================================= */

export default function App() {
  const [screen, setScreen] = useState<
  1 | 2 | 3 | 4 | 5 | 6
>(1);

  return (
    <div className="min-h-full flex items-start justify-center py-8 px-4 bg-[#f0f2f5]">
      <div
        className="relative bg-white overflow-hidden flex flex-col"
        style={{
          width: 390,
          minHeight: 844,
          maxHeight: 900,
          borderRadius: 44,
          boxShadow:
            "0 0 0 10px #1a1a2e, 0 0 0 12px #2d2d4e, 0 30px 80px rgba(0,0,0,0.35)",
        }}
      >
        <StatusBar />

        {screen === 1 && (
          <Screen1 onNext={() => setScreen(2)} />
        )}

        {screen === 2 && (
          <Screen2
            onBack={() => setScreen(1)}
            onNext={() => setScreen(3)}
          />
        )}

        {screen === 3 && (
          <Screen3
            onBack={() => setScreen(2)}
            onSubmitted={() => setScreen(4)}
          />
        )}

        {screen === 4 && (
          <SubmittedScreen
            onNext={() => setScreen(5)}
          />
        )}

        {screen === 5 && (
          <Screen9
            onBack={() => setScreen(4)}
            onAI={() => setScreen(6)}
          />
        )}

        {/*
          AI screen is rendered separately below.
          This avoids changing the existing visual flow.
        */}
      </div>

      {screen === 6 && (
        <div
          className="fixed inset-0 flex items-start justify-center py-8 px-4"
          style={{ background: "#f0f2f5" }}
        >
          <div
            className="relative bg-white overflow-hidden flex flex-col"
            style={{
              width: 390,
              minHeight: 844,
              maxHeight: 900,
              borderRadius: 44,
              boxShadow:
                "0 0 0 10px #1a1a2e, 0 0 0 12px #2d2d4e, 0 30px 80px rgba(0,0,0,0.35)",
            }}
          >
            <StatusBar />
            <Screen10 onBack={() => setScreen(5)} />
          </div>
        </div>
      )}
    </div>
  );
}