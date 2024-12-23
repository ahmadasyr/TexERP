SELECT
    T.unvan AS "Müşteri",
    SUM(CASE 
            WHEN DATEDIFF((F.tarih + INTERVAL 10 DAY), C.zaman) < 0 THEN DATEDIFF((F.tarih + INTERVAL 10 DAY), C.zaman)
            ELSE 0
        END) AS "Toplam Geç Günleri"
    FROM
    satisceki C
LEFT JOIN
    satissiparis S ON S.id = C.siparisid
LEFT JOIN
    satissiparisa A ON A.id = S.satissiparisno
LEFT JOIN
    satisfisa F ON F.id = A.fisid
LEFT JOIN
    tblhesaplar T ON T.id = F.hesapno
WHERE
    F.tarih BETWEEN '2024-11-01' AND '2024-11-31'
GROUP BY
    T.unvan;
