# Redigera innehåll på webbplatsen

Webbplatsens texter redigeras i ett webbaserat redigeringsverktyg som heter Sveltia CMS. Du behöver inte kunna kod – du arbetar i formulär och sparar med en knapp. Varje ändring sparas i webbplatsens filarkiv på GitHub och publiceras automatiskt på webbplatsen inom någon minut.

Så här kommer du igång.

## Logga in

1. Öppna redigeringssidan: <https://pattespatte.github.io/felix-ds-demo-site/admin/>
2. Klicka på ”Logga in med token”.
3. Om du inte redan har en åtkomsttoken: klicka på länken i inloggningsrutan. Den tar dig till GitHub med rätt inställningar förvalda. Skapa en token för repot `felix-ds-demo-site` med behörigheten ”Contents: Read and write” (innehåll: läsa och skriva). Kopiera tokenen.
4. Klistra in tokenen i inloggningsrutan och logga in.

Tokenen sparas i din webbläsare – nästa gång loggas du in automatiskt. Krav: ditt GitHub-konto måste ha skrivbehörighet i repot. En token går att skapa om eller ta bort på GitHub när som helst.

## Redigera en sida

1. Välj samlingen ”Sidor” i vänstermenyn.
2. Klicka på sidan du vill ändra, till exempel ”Frågor och svar”.
3. Ändra texterna i formuläret:
   - **Sidrubrik** – sidans stora rubrik.
   - **Introduktionstext** – inledningen under rubriken.
   - **Notisruta** – den blå informationsrutan överst på sidan.
   - **Informationskort** – små kort i rad, till exempel tidsgränser.
   - **Dragspel** – utfällbara frågor med svar. Klicka på ett objekt för att öppna det, använd knapparna för att lägga till, ta bort eller flytta frågor.
   - **Sektioner** – korten på sidan, i ordning från topp till botten. Varje sektion kan innehålla textstycken, punktlista, dragspelsfrågor, kontaktvägar och en knapplänk.
4. Klicka på ”Spara” (eller tangentbordsgenvägen Cmd+S/Ctrl+S).

När du sparar skickas ändringen till GitHub. Webbplatsen byggs om automatiskt och den nya texten syns på <https://pattespatte.github.io/felix-ds-demo-site/> inom någon minut. Redigeringsverktyget visar också när byggningen är klar, med en länk direkt till sidan du ändrade.

## Formatera text

I textfälten kan du använda enkel formatering:

- `**fetstil**` ger **fetstil**
- `[länktext](https://example.se)` ger en länk
- punktlistor gör du i fältet ”Punktlista”, inte i löptexten

Länkar till andra sidor på webbplatsen gör du enklast med fältet ”Knapplänk” i en sektion.

## Vilka sidor kan redigeras?

Följande sida är anslutna till redigeringsverktyget:

- Om oss
- Frågor och svar
- Tillgänglighet
- Patientinformation
- Vårdgaranti
- Din vårdkontakt
- Integritetspolicy

Övriga sidor ligger fortfarande som kod och flyttas över successivt. Saknar du en sida i listan – kontakta den som sköter webbplatsen.

## Bra att veta

- **Versionshistorik.** Varje ändring sparas i Git på GitHub. Det går alltid att se vad som ändrats, när och av vem, och att återställa en tidigare version.
- **Fliktiteln ändras inte i verktyget.** Rubriken i webbläsarfliken och sökningens sidbeskrivning styrs av koden. Behöver de ändras, kontakta den som sköter webbplatsen.
- **Nya sidor.** Att lägga till en helt ny sida kräver en utvecklare – men att lägga till frågor, listrader och sektioner på befintliga sidor gör du själv i verktyget.
- **Bilder.** Verktyget har ett mediebibliotek där bilder kan laddas upp, men sidornas innehåll använder ännu inga bilder.
- **Innehållet är fiktivt.** Alla namn, priser och kontaktuppgifter på webbplatsen är påhittade. Skriv inte in verkliga personers uppgifter eller riktiga organisationers namn.
