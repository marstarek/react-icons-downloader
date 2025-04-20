import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import * as ReactIcons from "react-icons";
import ReactDOMServer from 'react-dom/server';

const IconDownloader = () => {
  const [importStatement, setImportStatement] = useState('');
  const [iconTag, setIconTag] = useState('');
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
    // la: () => import('react-icons/la'),
    io: () => import('react-icons/io'),
    io5: () => import('react-icons/io5'),
    md: () => import('react-icons/md'),
    // ph: () => import('react-icons/ph'),
    rx: () => import('react-icons/rx'),
    ri: () => import('react-icons/ri'),
    si: () => import('react-icons/si'),
    sl: () => import('react-icons/sl'),
    tb: () => import('react-icons/tb'),
    tfi: () => import('react-icons/tfi'),
    ti: () => import('react-icons/ti'),
    vsc: () => import('react-icons/vsc'),
    wi: () => import('react-icons/wi'),
  };
  const parseImport = async () => {
    try {
      const matches = importStatement.match(/\{ ?(\w+) ?\} from ['"]react-icons\/(\w+)['"]/);
      if (!matches) throw new Error("Invalid import statement format.");
  
      const [, iconName, iconSet] = matches;
      const importer = iconImporters[iconSet];
  
      if (!importer) throw new Error("Icon set not supported.");
  
      const module = await importer();
      const IconComponent = module[iconName];
  
      if (!IconComponent) throw new Error("Icon not found in set.");
  
      setIconComponent(() => IconComponent);
      toast.success("Icon loaded!");
    } catch (err: any) {
      setError(err.message || 'Error loading icon');
      setIconComponent(null);
      toast.error(err.message);
    }
  };
  const downloadPNG = () => {
    if (!IconComponent) {
      setError("No icon loaded.");
      toast.error("No icon loaded.");
      return;
    }

    const svgElement = ReactDOMServer.renderToStaticMarkup(
      <IconComponent color={iconColor} size={128} />
    );

    const svgBlob = new Blob([svgElement], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const size = 128; // You can customize the resolution here
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(img, 0, 0, size, size);
        canvas.toBlob((blob) => {
          if (blob) {
            const pngUrl = URL.createObjectURL(blob);
            const a = document.createElement("a");
            const matches = importStatement.match(/\{ ?(\w+) ?\}/);
            const iconName = matches?.[1] || "icon";
            a.href = pngUrl;
            a.download = `${iconName}.png`;
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
    img.onerror = () => {
      toast.error("Failed to render icon.");
    };
    img.src = url;
  };
  const downloadSVG = () => {
    try {
      if (!IconComponent) {
        setError("No icon loaded.");
        return;
      }
      const element = <IconComponent color={iconColor} />;
      const svgString = ReactDOMServer.renderToStaticMarkup(element);
  

      const blob = new Blob([svgString], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);

      const anchor = document.createElement("a");
      const matches = importStatement.match(/\{ ?(\w+) ?\}/);
      const iconName = matches?.[1] || "icon";

      anchor.href = url;
      anchor.download = `${iconName}.svg`;
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
      URL.revokeObjectURL(url);

      toast.success("SVG downloaded!");
    } catch (err) {
      console.error(err);
      setError("Failed to download SVG.");
      toast.error("Download failed.");
    }
  };

  return (
    <Card className="p-4 w-full  md:w-[40%] h-full ">
      <h2 className="text-2xl font-bold mb-2 text-center"> Icons Downloader</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Import Statement</label>
          <Input
            placeholder='import { AiFillAlipaySquare } from "react-icons/ai"'
            value={importStatement}
            onChange={(e) => setImportStatement(e.target.value)}
            className="w-full font-mono text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Icon Tag</label>
          <Input
            placeholder="<AiFillAlipaySquare />"
            value={iconTag}
            onChange={(e) => setIconTag(e.target.value)}
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
        <div className="flex justify-between items-center mt-2">
          <Button onClick={parseImport}>Load Icon</Button>
          <Button onClick={downloadSVG} disabled={!IconComponent}>Download SVG</Button>
          <Button onClick={downloadPNG} disabled={!IconComponent}>Download PNG</Button>

        </div>

        {/* {IconComponent && (
          <div className="text-center mt-4 text-3xl text-black w-full justify-center items-center flex flex-col">
            <IconComponent className="text-center mt-4 text-3xl w-32 h-32 " />
          </div>
        )} */}
{IconComponent && (
  <div className="text-center mt-4 w-full justify-center items-center flex flex-col">
    <IconComponent className="w-32 h-32" color={iconColor} />
  </div>
)}
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>
    </Card>
  );
};

export default IconDownloader;