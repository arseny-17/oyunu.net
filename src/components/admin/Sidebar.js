
import Link from 'next/link'

export default function Sidebar(){
    return (
        <>
      
        <div className="sidebar">
            <span>Navigation</span>
            <Link href="/admin"><i className="fa fa-globe" aria-hidden="true"></i>Console</Link>
            <Link href="/admin/options"><i className="fa fa-anchor" aria-hidden="true"></i>Опции</Link>
            <Link href="/admin/pages"><i className="fa fa-file-text" aria-hidden="true"></i>Страницы</Link>
            <Link href="/admin/add-page"><i className="fa fa-object-ungroup" aria-hidden="true"></i>Создать страницу</Link>
            <Link href="/admin/categories"><i className="fa fa-object-ungroup" aria-hidden="true"></i>Языки</Link>
            <Link href="/admin/add-category"><i className="fa fa-object-ungroup" aria-hidden="true"></i>Добавить язык</Link>
            <Link href="/admin/media-library"><i className="fa fa-object-ungroup" aria-hidden="true"></i>Медиабиблиотека</Link>
            <span className="year">2023, Alfa admin Panel for SEO</span>
          </div>
    </>
    )
}

