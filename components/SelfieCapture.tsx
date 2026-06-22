"use client";

import { useEffect, useRef, useState } from "react";

// Required funny-selfie capture. Camera-only (no file upload) so the photo is taken
// live -> a basic anti-impersonation gate. Produces a square JPEG data URL via
// onChange; the parent uploads it to Supabase Storage on submit.
export function SelfieCapture({
  value,
  onChange,
}: {
  value: string;
  onChange: (dataUrl: string) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [status, setStatus] = useState<"idle" | "live" | "error">("idle");
  const [err, setErr] = useState("");

  function stopCamera() {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  }

  // Attach the stream to the <video> AFTER it has mounted (status === "live").
  // Attaching before setStatus would hit a null ref (the video isn't rendered yet).
  useEffect(() => {
    const v = videoRef.current;
    if (status === "live" && streamRef.current && v) {
      v.srcObject = streamRef.current;
      v.play().catch(() => {});
    }
  }, [status]);

  // release the camera when the component unmounts
  useEffect(() => () => stopCamera(), []);

  async function startCamera() {
    setErr("");
    // Camera needs a secure context (https or localhost). On a raw LAN IP over http,
    // navigator.mediaDevices is undefined -> clear message instead of a crash.
    if (!navigator.mediaDevices?.getUserMedia) {
      setStatus("error");
      setErr("Your browser is blocking the camera (it needs https). The live site is secure, so it works there. On a laptop, localhost works too.");
      return;
    }
    try {
      streamRef.current = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
        audio: false,
      });
      setStatus("live"); // mounts the <video>; the effect then attaches the stream
    } catch {
      setStatus("error");
      setErr("Camera blocked. A funny selfie is required (no impersonators allowed) -- enable camera access and try again.");
    }
  }

  function snap() {
    const v = videoRef.current;
    if (!v || !v.videoWidth) return;
    const size = 480;
    const side = Math.min(v.videoWidth, v.videoHeight);
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    // center-crop to a square, mirror so it reads like a selfie
    ctx.translate(size, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(v, (v.videoWidth - side) / 2, (v.videoHeight - side) / 2, side, side, 0, 0, size, size);
    onChange(canvas.toDataURL("image/jpeg", 0.8));
    stopCamera();
    setStatus("idle");
  }

  function retake() {
    onChange("");
    startCamera();
  }

  // captured: show the shot + retake
  if (value) {
    return (
      <div className="mt-2 flex items-center gap-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={value} alt="your selfie" className="h-24 w-24 rounded-lg border border-gold/40 object-cover" />
        <button
          type="button"
          onClick={retake}
          className="rounded-full border border-white/15 px-4 py-2 text-sm text-sand transition-colors hover:border-gold hover:text-gold"
        >
          Retake
        </button>
      </div>
    );
  }

  // live: show the feed + snap
  if (status === "live") {
    return (
      <div className="mt-2">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="h-48 w-48 -scale-x-100 rounded-lg border border-teal/40 bg-black object-cover"
        />
        <div className="mt-2 flex gap-2">
          <button
            type="button"
            onClick={snap}
            className="rounded-full bg-gold px-5 py-2 text-sm font-semibold text-abyss transition-transform hover:scale-105"
          >
            Snap it
          </button>
          <button
            type="button"
            onClick={() => {
              stopCamera();
              setStatus("idle");
            }}
            className="rounded-full border border-white/15 px-4 py-2 text-sm text-foam/70 hover:text-sand"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  // idle / error: start button
  return (
    <div className="mt-2">
      <button
        type="button"
        onClick={startCamera}
        className="rounded-lg border border-teal/40 px-5 py-3 text-sm font-semibold text-teal transition-colors hover:border-teal hover:bg-teal/10"
      >
        Open camera
      </button>
      {err && <p className="mt-2 text-sm text-coral">{err}</p>}
    </div>
  );
}
