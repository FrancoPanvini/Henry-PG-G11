//Axios desde el componente FormularioPosteo.jsx

var nodemailer = require('nodemailer');

const postRegister = (req, res) => {
  let { mail, name } = req.body;
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'adogtamehenry@gmail.com',
      pass: 'henryft16',
    },
  });

  var mailOptions = {
    from: 'adogtamehenry@gmail.com',
    to: mail,
    subject: `Hola ${name} Bienvenid@ a Adogtame`,
    html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" style="width:100%;font-family:arial, 'helvetica neue', helvetica, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
     <head> 
      <meta charset="UTF-8"> 
      <meta content="width=device-width, initial-scale=1" name="viewport"> 
      <meta name="x-apple-disable-message-reformatting"> 
      <meta http-equiv="X-UA-Compatible" content="IE=edge"> 
      <meta content="telephone=no" name="format-detection"> 
      <title>Registro</title> 
      <!--[if (mso 16)]>
        <style type="text/css">
        a {text-decoration: none;}
        </style>
        <![endif]--> 
      <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--> 
      <!--[if gte mso 9]>
    <xml>
        <o:OfficeDocumentSettings>
        <o:AllowPNG></o:AllowPNG>
        <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
    </xml>
    <![endif]--> 
      <!--[if !mso]><!-- --> 
      <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,400i,700,700i" rel="stylesheet"> 
      <!--<![endif]--> 
      <style type="text/css">
    #outlook a {
        padding:0;
    }
    .ExternalClass {
        width:100%;
    }
    .ExternalClass,
    .ExternalClass p,
    .ExternalClass span,
    .ExternalClass font,
    .ExternalClass td,
    .ExternalClass div {
        line-height:100%;
    }
    .es-button {
        mso-style-priority:100!important;
        text-decoration:none!important;
    }
    a[x-apple-data-detectors] {
        color:inherit!important;
        text-decoration:none!important;
        font-size:inherit!important;
        font-family:inherit!important;
        font-weight:inherit!important;
        line-height:inherit!important;
    }
    .es-desk-hidden {
        display:none;
        float:left;
        overflow:hidden;
        width:0;
        max-height:0;
        line-height:0;
        mso-hide:all;
    }
    .es-button-border:hover a.es-button, .es-button-border:hover button.es-button {
        background:#efefef!important;
        border-color:#efefef!important;
        color:#000000!important;
    }
    .es-button-border:hover {
        background:#efefef!important;
        border-style:solid solid solid solid!important;
        border-color:#42d159 #42d159 #42d159 #42d159!important;
    }
    [data-ogsb] .es-button {
        border-width:0!important;
        padding:10px 20px 10px 20px!important;
    }
    @media only screen and (max-width:600px) {p, ul li, ol li, a { line-height:150%!important } h1, h2, h3, h1 a, h2 a, h3 a { line-height:120%!important } h1 { font-size:30px!important; text-align:center } h2 { font-size:26px!important; text-align:center } h3 { font-size:20px!important; text-align:center } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:30px!important } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:26px!important } .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:20px!important } .es-menu td a { font-size:16px!important } .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a { font-size:16px!important } .es-content-body p, .es-content-body ul li, .es-content-body ol li, .es-content-body a { font-size:16px!important } .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a { font-size:16px!important } .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a { font-size:12px!important } *[class="gmail-fix"] { display:none!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 { text-align:right!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-button-border { display:block!important } a.es-button, button.es-button { font-size:20px!important; display:block!important; border-width:10px 0px 10px 0px!important } .es-btn-fw { border-width:10px 0px!important; text-align:center!important } .es-adaptive table, .es-btn-fw, .es-btn-fw-brdr, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .es-adapt-td { display:block!important; width:100%!important } .adapt-img { width:100%!important; height:auto!important } .es-m-p0 { padding:0px!important } .es-m-p0r { padding-right:0px!important } .es-m-p0l { padding-left:0px!important } .es-m-p0t { padding-top:0px!important } .es-m-p0b { padding-bottom:0!important } .es-m-p20b { padding-bottom:20px!important } .es-mobile-hidden, .es-hidden { display:none!important } tr.es-desk-hidden, td.es-desk-hidden, table.es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden { display:table-row!important } table.es-desk-hidden { display:table!important } td.es-desk-menu-hidden { display:table-cell!important } .es-menu td { width:1%!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } table.es-social { display:inline-block!important } table.es-social td { display:inline-block!important } }
    </style> 
     </head> 
     <body style="width:100%;font-family:arial, 'helvetica neue', helvetica, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0"> 
      <div class="es-wrapper-color" style="background-color:#F6F6F6"> 
       <!--[if gte mso 9]>
                <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
                    <v:fill type="tile" color="#f6f6f6"></v:fill>
                </v:background>
            <![endif]--> 
       <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top"> 
         <tr style="border-collapse:collapse"> 
          <td valign="top" style="padding:0;Margin:0"> 
           <table cellpadding="0" cellspacing="0" class="es-header" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top"> 
             <tr style="border-collapse:collapse"> 
              <td align="center" style="padding:0;Margin:0"> 
               <table bgcolor="#FFFFFF" class="es-header-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px"> 
                 <tr style="border-collapse:collapse"> 
                  <td align="left" style="padding:0;Margin:0;padding-top:20px;padding-left:20px;padding-right:20px;background-position:center top;background-color:transparent" bgcolor="transparent"> 
                   <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                     <tr style="border-collapse:collapse"> 
                      <td align="center" valign="top" style="padding:0;Margin:0;width:560px"> 
                       <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                         <tr style="border-collapse:collapse"> 
                          <td align="center" style="padding:0;Margin:0;font-size:0px"><a target="_blank" href="https://viewstripo.email" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;color:#1376C8;font-size:14px"><img src="https://uffifh.stripocdn.email/content/guids/CABINET_3815b280244ea7689263da5d5b520c3e/images/pngegg.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" height="67" width="67"></a></td> 
                         </tr> 
                       </table></td> 
                     </tr> 
                   </table></td> 
                 </tr> 
                 <tr style="border-collapse:collapse"> 
                  <td align="left" style="padding:0;Margin:0;padding-top:20px;padding-left:20px;padding-right:20px;background-position:center top"> 
                   <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                     <tr style="border-collapse:collapse"> 
                      <td align="center" valign="top" style="padding:0;Margin:0;width:560px"> 
                       <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                         <tr style="border-collapse:collapse"> 
                          <td align="center" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'source sans pro', 'helvetica neue', helvetica, arial, sans-serif;line-height:30px;color:#999999;font-size:20px">HOLA ${name}, BIENVENIDO A ADOGTAME</p></td> 
                         </tr> 
                       </table></td> 
                     </tr> 
                   </table></td> 
                 </tr> 
                 <tr style="border-collapse:collapse"> 
                  <td align="left" style="padding:0;Margin:0;padding-bottom:20px;padding-left:20px;padding-right:20px;background-position:center top"> 
                   <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                     <tr style="border-collapse:collapse"> 
                      <td align="center" valign="top" style="padding:0;Margin:0;width:560px"> 
                       <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                         <tr style="border-collapse:collapse"> 
                          <td align="center" style="padding:0;Margin:0;padding-top:5px;padding-bottom:5px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'source sans pro', 'helvetica neue', helvetica, arial, sans-serif;line-height:30px;color:#999999;font-size:20px">Adopciones y Mascotas Extraviadas</p></td> 
                         </tr> 
                         <tr style="border-collapse:collapse"> 
                          <td align="center" style="padding:0;Margin:0;padding-bottom:10px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'source sans pro', 'helvetica neue', helvetica, arial, sans-serif;line-height:30px;color:#999999;font-size:20px">Refugios y Eventos</p></td> 
                         </tr> 
                       </table></td> 
                     </tr> 
                   </table></td> 
                 </tr> 
                 <tr style="border-collapse:collapse"> 
                  <td align="left" style="padding:0;Margin:0;background-position:center top;background-color:#efefef" bgcolor="#efefef"> 
                   <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                     <tr style="border-collapse:collapse"> 
                      <td align="center" valign="top" style="padding:0;Margin:0;width:600px"> 
                       <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                         <tr style="border-collapse:collapse"> 
                          <td style="padding:0;Margin:0"> 
                           <table cellpadding="0" cellspacing="0" width="100%" class="es-menu" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                             <tr class="links" style="border-collapse:collapse"> 
                              <td align="center" valign="top" width="33.33%" style="Margin:0;padding-left:5px;padding-right:5px;padding-top:13px;padding-bottom:12px;border:0" id="esd-menu-id-0" bgcolor="#698198"><a target="_blank" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;display:block;font-family:arial, 'helvetica neue', helvetica, sans-serif;color:#ffffff;font-size:14px;font-weight:bold" href="https://viewstripo.email/">ADOPCIONES</a></td> 
                              <td align="center" valign="top" width="33.33%" style="Margin:0;padding-left:5px;padding-right:5px;padding-top:13px;padding-bottom:12px;border:0" id="esd-menu-id-1" bgcolor="#698198" esdev-border-color="#000000"><a target="_blank" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;display:block;font-family:arial, 'helvetica neue', helvetica, sans-serif;color:#ffffff;font-size:14px;font-weight:bold" href="https://viewstripo.email/">PERDIDOS</a></td> 
                              <td align="center" valign="top" width="33.33%" style="Margin:0;padding-left:5px;padding-right:5px;padding-top:13px;padding-bottom:12px;border:0" id="esd-menu-id-2" bgcolor="#698198" esdev-border-color="#000000"><a target="_blank" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;display:block;font-family:arial, 'helvetica neue', helvetica, sans-serif;color:#ffffff;font-size:14px;font-weight:bold" href="https://viewstripo.email/">REFUGIOS</a></td> 
                             </tr> 
                           </table></td> 
                         </tr> 
                       </table></td> 
                     </tr> 
                   </table></td> 
                 </tr> 
               </table></td> 
             </tr> 
           </table> 
           <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
             <tr style="border-collapse:collapse"> 
              <td align="center" style="padding:0;Margin:0"> 
               <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
                 <tr style="border-collapse:collapse"> 
                  <td align="left" style="padding:0;Margin:0;background-position:center top"> 
                   <!--[if mso]><table style="width:600px" cellpadding="0" cellspacing="0"><tr><td style="width:295px" valign="top"><![endif]--> 
                   <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
                     <tr style="border-collapse:collapse"> 
                      <td class="es-m-p20b" align="left" style="padding:0;Margin:0;width:295px"> 
                       <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                         <tr class="es-mobile-hidden" style="border-collapse:collapse"> 
                          <td align="center" style="padding:0;Margin:0;font-size:0"><img class="adapt-img" src="https://uffifh.stripocdn.email/content/guids/CABINET_1bf8a5db9569173f939030e657a9f377/images/52881560160322497.jpg" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="295" height="208"></td> 
                         </tr> 
                       </table></td> 
                     </tr> 
                   </table> 
                   <!--[if mso]></td><td style="width:10px"></td><td style="width:295px" valign="top"><![endif]--> 
                   <table cellpadding="0" cellspacing="0" class="es-right" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right"> 
                     <tr style="border-collapse:collapse"> 
                      <td align="left" style="padding:0;Margin:0;width:295px"> 
                       <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                         <tr style="border-collapse:collapse"> 
                          <td align="center" style="padding:0;Margin:0;font-size:0"><img class="adapt-img" src="https://uffifh.stripocdn.email/content/guids/CABINET_1bf8a5db9569173f939030e657a9f377/images/67571560160425173.jpg" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="295" height="207"></td> 
                         </tr> 
                       </table></td> 
                     </tr> 
                   </table> 
                   <!--[if mso]></td></tr></table><![endif]--></td> 
                 </tr> 
                 <tr style="border-collapse:collapse"> 
                  <td align="left" style="padding:0;Margin:0;padding-top:10px;background-position:center top"> 
                   <!--[if mso]><table style="width:600px" cellpadding="0" cellspacing="0"><tr><td style="width:207px" valign="top"><![endif]--> 
                   <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
                     <tr style="border-collapse:collapse"> 
                      <td class="es-m-p0r es-m-p20b" align="center" style="padding:0;Margin:0;width:187px"> 
                       <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-position:center top" role="presentation"> 
                         <tr style="border-collapse:collapse"> 
                          <td align="center" style="padding:0;Margin:0;font-size:0"><img class="adapt-img" src="https://uffifh.stripocdn.email/content/guids/CABINET_1bf8a5db9569173f939030e657a9f377/images/72261560161028871.jpg" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="187" height="261"></td> 
                         </tr> 
                       </table></td> 
                      <td class="es-hidden" style="padding:0;Margin:0;width:20px"></td> 
                     </tr> 
                   </table> 
                   <!--[if mso]></td><td style="width:186px" valign="top"><![endif]--> 
                   <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
                     <tr style="border-collapse:collapse"> 
                      <td class="es-m-p20b" align="center" style="padding:0;Margin:0;width:186px"> 
                       <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-position:center top" role="presentation"> 
                         <tr style="border-collapse:collapse"> 
                          <td align="center" height="110" style="padding:0;Margin:0"></td> 
                         </tr> 
                         <tr style="border-collapse:collapse"> 
                          <td align="center" style="padding:0;Margin:0;font-size:0px"><img class="adapt-img" src="https://uffifh.stripocdn.email/content/guids/CABINET_3815b280244ea7689263da5d5b520c3e/images/adogtame.PNG" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="186" height="50"></td> 
                         </tr> 
                       </table></td> 
                     </tr> 
                   </table> 
                   <!--[if mso]></td><td style="width:20px"></td><td style="width:186px" valign="top"><![endif]--> 
                   <table cellpadding="0" cellspacing="0" class="es-right" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right"> 
                     <tr style="border-collapse:collapse"> 
                      <td class="es-m-p0r es-m-p20b" align="center" style="padding:0;Margin:0;width:186px"> 
                       <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-position:center top" role="presentation"> 
                         <tr style="border-collapse:collapse"> 
                          <td align="center" style="padding:0;Margin:0;font-size:0"><img class="adapt-img" src="https://uffifh.stripocdn.email/content/guids/CABINET_1bf8a5db9569173f939030e657a9f377/images/75961560161347879.jpg" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;width:186px" width="186" height="260"></td> 
                         </tr> 
                       </table></td> 
                     </tr> 
                   </table> 
                   <!--[if mso]></td></tr></table><![endif]--></td> 
                 </tr> 
                 <tr style="border-collapse:collapse"> 
                  <td align="left" style="padding:0;Margin:0;padding-top:10px;background-position:center top"> 
                   <!--[if mso]><table style="width:600px" cellpadding="0" cellspacing="0"><tr><td style="width:295px" valign="top"><![endif]--> 
                   <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
                     <tr style="border-collapse:collapse"> 
                      <td class="es-m-p20b" align="left" style="padding:0;Margin:0;width:295px"> 
                       <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                         <tr style="border-collapse:collapse"> 
                          <td align="center" style="padding:0;Margin:0;font-size:0"><img class="adapt-img" src="https://uffifh.stripocdn.email/content/guids/CABINET_1bf8a5db9569173f939030e657a9f377/images/64961560160717708.jpg" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="295" height="220"></td> 
                         </tr> 
                       </table></td> 
                     </tr> 
                   </table> 
                   <!--[if mso]></td><td style="width:10px"></td><td style="width:295px" valign="top"><![endif]--> 
                   <table cellpadding="0" cellspacing="0" class="es-right" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right"> 
                     <tr style="border-collapse:collapse"> 
                      <td align="left" style="padding:0;Margin:0;width:295px"> 
                       <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                         <tr class="es-mobile-hidden" style="border-collapse:collapse"> 
                          <td align="center" style="padding:0;Margin:0;font-size:0"><img class="adapt-img" src="https://uffifh.stripocdn.email/content/guids/CABINET_1bf8a5db9569173f939030e657a9f377/images/64731560160822009.jpg" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="295" height="220"></td> 
                         </tr> 
                       </table></td> 
                     </tr> 
                   </table> 
                   <!--[if mso]></td></tr></table><![endif]--></td> 
                 </tr> 
               </table></td> 
             </tr> 
           </table> 
           <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
             <tr style="border-collapse:collapse"> 
              <td align="center" bgcolor="transparent" style="padding:0;Margin:0;background-color:transparent"> 
               <table bgcolor="#efefef" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#efefef;width:600px"> 
                 <tr style="border-collapse:collapse"> 
                  <td align="left" style="Margin:0;padding-top:20px;padding-bottom:20px;padding-left:20px;padding-right:20px;background-position:center top"> 
                   <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                     <tr style="border-collapse:collapse"> 
                      <td align="center" valign="top" style="padding:0;Margin:0;width:560px"> 
                       <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                         <tr style="border-collapse:collapse"> 
                          <td align="center" class="made_with" style="padding:0;Margin:0;font-size:0"><a target="_blank" href="https://viewstripo.email/?utm_source=templates&utm_medium=email&utm_campaign=pet3&utm_content=promo_newsletter" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;color:#D9EAD3;font-size:14px"><img src="https://uffifh.stripocdn.email/content/guids/CABINET_f54c0e2b5cdfebc7e51f110fc79a4375/images/64311561365630691.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="125" height="56"></a></td> 
                         </tr> 
                       </table></td> 
                     </tr> 
                   </table></td> 
                 </tr> 
               </table></td> 
             </tr> 
           </table></td> 
         </tr> 
       </table> 
      </div>  
     </body>
    </html>`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.status(200).jsonp(req.body);
    }
  });
};

module.exports = postRegister;
