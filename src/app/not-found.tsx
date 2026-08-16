"use client";

/* xDev AI — custom 404, bilingual (EN/VI) via the global language context. */
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLang } from "@/i18n/LanguageContext";
import { AlertCircle, Home } from "lucide-react";
import { useRouter } from "next/navigation";

const NOT_FOUND_COPY = {
  en: {
    title: "Page Not Found",
    body: (
      <>
        Sorry, the page you are looking for doesn't exist.
        <br />
        It may have been moved or deleted.
      </>
    ),
    goHome: "Go Home",
  },
  vi: {
    title: "Không tìm thấy trang",
    body: (
      <>
        Rất tiếc, trang bạn đang tìm không tồn tại.
        <br />
        Nó có thể đã được chuyển hoặc xóa.
      </>
    ),
    goHome: "Về trang chủ",
  },
} as const;

export default function NotFound() {
  const router = useRouter();
  const { locale } = useLang();

  const handleGoHome = () => {
    router.push("/");
  };

  const copy = NOT_FOUND_COPY[locale];

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
      <Card className="w-full max-w-lg mx-4 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardContent className="pt-8 pb-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-red-100 rounded-full animate-pulse" />
              <AlertCircle className="relative h-16 w-16 text-red-500" />
            </div>
          </div>

          <h1 className="text-4xl font-bold text-slate-900 mb-2">404</h1>

          <h2 className="text-xl font-semibold text-slate-700 mb-4">{copy.title}</h2>

          <p className="text-slate-600 mb-8 leading-relaxed">{copy.body}</p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={handleGoHome}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <Home className="w-4 h-4 mr-2" />
              {copy.goHome}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
