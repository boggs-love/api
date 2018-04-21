<?php

namespace App\Controller;

use App\Entity\RSVP;
use GeoSocio\HttpSerializer\Annotation\RequestGroups;
use GeoSocio\HttpSerializer\Annotation\ResponseGroups;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\Messenger\MessageBusInterface;
use Symfony\Bridge\Doctrine\RegistryInterface;
use Twig\Environment;

/**
 * @Route(
 *    service="app.controller_respond",
 *    defaults = {
 *       "_format" = "json"
 *    }
 * )
 */
class RespondController
{
    /**
     * @var RegistryInterface
     */
    protected $doctrine;

    /**
     * @var MessageBusInterface
     */
    protected $messenger;

    /**
     * Respond Controller
     */
    public function __construct(
        RegistryInterface $doctrine,
        MessageBusInterface $messenger
    ) {
          $this->doctrine = $doctrine;
          $this->messenger = $messenger;
    }

    /**
     * @Route("/rsvp")
     * @Method("POST")
     * @RequestGroups("create")
     * @ResponseGroups("read")
     *
     * @param RSVP $rsvp
     *
     * @return RSVP
     */
    public function createAction(RSVP $rsvp) : RSVP
    {
        $em = $this->doctrine->getManager();

        // Save the RSVP
        $em->persist($rsvp);
        $em->flush();

        // Notify other services.
        $this->messenger->dispatch($rsvp);

        return $rsvp;
    }
}
