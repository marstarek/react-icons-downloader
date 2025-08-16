import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import ReactDOMServer from 'react-dom/server';

const IconDownloader = () => {
  const [iconName, setIconName] = useState('');
  const [iconColor, setIconColor] = useState('#000000');
  const [IconComponent, setIconComponent] = useState<any>(null);
  const [error, setError] = useState('');

  const iconImporters: Record<string, () => Promise<any>> = {
    ai: () => import('react-icons/ai'),
    bs: () => import('react-icons/bs'),
    bi: () => import('react-icons/bi'),
    ci: () => import('react-icons/ci'),
    cg: () => import('react-icons/cg'),
    di: () => import('react-icons/di'),
    fi: () => import('react-icons/fi'),
    fc: () => import('react-icons/fc'),
    fa: () => import('react-icons/fa'),
    gi: () => import('react-icons/gi'),
    go: () => import('react-icons/go'),
    gr: () => import('react-icons/gr'),
    hi: () => import('react-icons/hi'),
    hi2: () => import('react-icons/hi2'),
    im: () => import('react-icons/im'),
    io: () => import('react-icons/io'),
    io5: () => import('react-icons/io5'),
    md: () => import('react-icons/md'),
    rx: () => import('react-icons/rx'),
    ri: () => import('react-icons/ri'),
    si: () => import('react-icons/si'),
    sl: () => import('react-icons/sl'),
    tb: () => import('react-icons/tb'),
    tfi: () => import('react-icons/tfi'),
    ti: () => import('react-icons/ti'),
    vsc: () => import('react-icons/vsc'),
    wi: () => import('react-icons/wi'),
    lu: () => import('react-icons/lu'),
  };

  const loadIcon = async () => {
    try {
      const cleanName = iconName.replace(/\s+/g, ""); // remove ALL spaces
      const prefix = cleanName.slice(0, 2).toLowerCase();
      const importer = iconImporters[prefix];

      if (!importer) throw new Error(`Icon set '${prefix}' not supported.`);

      const module = await importer();
      const Icon = module[cleanName];

      if (!Icon) throw new Error(`Icon '${cleanName}' not found.`);

      setIconComponent(() => Icon);
      setError('');
      toast.success("Icon loaded!");
    } catch (err: any) {
      setError(err.message || "Error loading icon.");
      setIconComponent(null);
      toast.error(err.message);
    }
  };

  const downloadSVG = () => {
    if (!IconComponent) return toast.error("No icon loaded.");
    const cleanName = iconName.replace(/\s+/g, "");

    const svgString = ReactDOMServer.renderToStaticMarkup(
      <IconComponent color={iconColor} />
    );
    const blob = new Blob([svgString], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);

    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${cleanName}.svg`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
    toast.success("SVG downloaded!");
  };

  const downloadPNG = () => {
    if (!IconComponent) return toast.error("No icon loaded.");
    const cleanName = iconName.replace(/\s+/g, "");

    const svgElement = ReactDOMServer.renderToStaticMarkup(
      <IconComponent color={iconColor} size={128} />
    );
    const svgBlob = new Blob([svgElement], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const size = 128;
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(img, 0, 0, size, size);
        canvas.toBlob((blob) => {
          if (blob) {
            const pngUrl = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = pngUrl;
            a.download = `${cleanName}.png`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(pngUrl);
            toast.success("PNG downloaded!");
          }
        }, "image/png");
      }
      URL.revokeObjectURL(url);
    };
    img.onerror = () => toast.error("Failed to render icon.");
    img.src = url;
  };

  return (
    <Card className="p-4 w-full md:w-[40%]">
      <h2 className="text-2xl font-bold mb-4 text-center">Icons Downloader</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Icon Name</label>
          <Input
            placeholder="e.g. AiFillAlipaySquare"
            value={iconName}
            onChange={(e) => setIconName(e.target.value.replace(/\s+/g, ""))}
            className="w-full font-mono text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Icon Color</label>
          <Input
            type="color"
            value={iconColor}
            onChange={(e) => setIconColor(e.target.value)}
            className="w-16 h-10 p-0 border-none"
          />
        </div>

        <div className="flex justify-between items-center mt-2 w-full flex-wrap gap-2">
          <Button onClick={loadIcon}>Load Icon</Button>
          <Button onClick={downloadSVG} disabled={!IconComponent}>Download SVG</Button>
          <Button onClick={downloadPNG} disabled={!IconComponent}>Download PNG</Button>
        </div>

        {IconComponent && (
          <div className="text-center mt-4 w-full flex justify-center items-center flex-col">
            <IconComponent className="w-32 h-32" color={iconColor} />
          </div>
        )}

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>
    </Card>
  );
};

export default IconDownloader;
