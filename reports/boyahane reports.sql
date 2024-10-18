SELECT
    tblhesaplar.unvan AS "Şirket",
    DATE(boyahanesiparis.zaman) as "Çıkış Tarihi",
    DATE(boyahaneirsaliye.tarih) as "Geliş Tarihi",
    DATEDIFF(boyahanesiparis.zaman, boyahaneirsaliye.tarih) AS "Fark",
    CASE 
        WHEN DATEDIFF(boyahaneirsaliye.tarih, boyahanesiparis.zaman) <= 10 THEN 100
        ELSE (100 - ((DATEDIFF(boyahaneirsaliye.tarih, boyahanesiparis.zaman) - 10) * 10))
    END AS "% Çıkış uyum oranı",
    boyahanesiparis.kazan as "Siparis No",
    boyahanesiparis.renkno as "Renk No",
    boyahanesiparis.gidentop "Giden Top",
    boyahanesiparis.gidenm as "Giden Metre",
    boyahanesiparis.gidenkg as "Giden KG",
    boyahanesiparis.gelentop as "Gelen Top",
    boyahanesiparis.gelenm as "Gelen Metre",
    boyahanesiparis.gelenkg as "Gelen KG"
FROM 
    boyahanesiparis
JOIN 
    boyahaneirsaliye ON boyahaneirsaliye.siparisid = boyahanesiparis.id
JOIN 
    boyahanefis ON boyahanefis.id = boyahanesiparis.fisid
JOIN 
    tblhesaplar ON tblhesaplar.id = boyahanefis.hesapno
WHERE 
    DATE(boyahaneirsaliye.tarih) BETWEEN '2024-09-01' AND '2024-09-30';
   
SELECT
    NULL AS "Şirket",
    NULL AS "Çıkış Tarihi",
    NULL AS "Geliş Tarihi",
    AVG(DATEDIFF(boyahanesiparis.zaman, boyahaneirsaliye.tarih)) AS "Fark",
    AVG(CASE 
        WHEN DATEDIFF(boyahanesiparis.zaman, boyahaneirsaliye.tarih) <= 10 THEN 100
        ELSE (100 - ((DATEDIFF(boyahaneirsaliye.tarih, boyahanesiparis.zaman) - 10) * 10))
    END) AS "% Çıkış uyum oranı",
    NULL AS "Siparis No",
    NULL AS "Renk No",
    SUM(boyahanesiparis.gidentop) AS "Giden Top",
    SUM(boyahanesiparis.gidenm) AS "Giden Metre",
    SUM(boyahanesiparis.gidenkg) AS "Giden KG",
    SUM(boyahanesiparis.gelentop) AS "Gelen Top",
    SUM(boyahanesiparis.gelenm) AS "Gelen Metre",
    SUM(boyahanesiparis.gelenkg) AS "Gelen KG"
FROM 
    boyahanesiparis
JOIN 
    boyahaneirsaliye ON boyahaneirsaliye.siparisid = boyahanesiparis.id
JOIN 
    boyahanefis ON boyahanefis.id = boyahanesiparis.fisid
JOIN 
    tblhesaplar ON tblhesaplar.id = boyahanefis.hesapno
WHERE 
    DATE(boyahaneirsaliye.tarih) BETWEEN '2024-09-01' AND '2024-09-30';
