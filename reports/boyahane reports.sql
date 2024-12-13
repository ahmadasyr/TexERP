SELECT
    tblhesaplar.unvan AS "Şirket",
    DATE(boyahanesiparis.zaman) as "Çıkış Tarihi",
    (DATE(boyahanesiparis.zaman) + INTERVAL 10 DAY) AS "Termin Tarihi",
    DATE(boyahaneirsaliye.tarih) as "Geliş Tarihi",
    DATEDIFF((DATE(boyahanesiparis.zaman) + INTERVAL 10 DAY) , boyahaneirsaliye.tarih) AS "Fark",
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
    DATE(boyahaneirsaliye.tarih) BETWEEN '2024-07-01' AND '2024-07-31';